import { Uploader as TUploader } from '@antmjs/vantui';
import { UploaderProps as TUploaderProps } from '@antmjs/vantui/types/uploader';
import { observer } from '@formily/react';
import { IHTTPResponse, judgeIsEmpty, judgeIsSuccess, useBaseStore, useConfig } from '@yimoko/store';
import { useCallback, useEffect, useMemo } from 'react';

import { uploadFile } from '../adapter/http';
import { IConfig } from '../store/config';

export interface UploaderProps extends Omit<TUploaderProps, 'fileList'> {
  valueType?: 'string' | 'string[]' | 'array'
  value?: string | string[] | Array<{ url: string } & Record<string, any>>
  onChange?: (value?: string | any[]) => void
  splitter?: string
  upload?: Pick<Taro.uploadFile.Option, 'url' | 'fileName' | 'name' | 'header' | 'formData' | 'timeout'> |
  ((filePath: string) => Promise<IHTTPResponse<string | ({ url: string } & Record<string, any>)>>)
}

export interface IFile {
  url: string
  status?: 'uploading' | 'failed' | 'done'
  message?: string,
}

export const Uploader = observer((props: UploaderProps) => {
  const { onChange, value, valueType = 'string', onDelete, maxCount, multiple, upload, ...args } = props;
  const { values, setValuesByField } = useBaseStore<{ fileList: IFile[] }>({ defaultValues: { fileList: [] }, api: {} });
  const { fileList } = values;

  const { uploadAPI } = useConfig<IConfig>();

  const setFileList = useCallback((fileList: IFile[]) => setValuesByField('fileList', fileList), [setValuesByField]);

  const curMaxCount = useMemo(() => (valueType === 'string' ? 1 : maxCount), [maxCount, valueType]);

  const curUpload = useCallback(async (filePath: string) => {
    if (typeof upload === 'function') {
      return upload(filePath);
    }
    return uploadFile({ url: uploadAPI, name: 'file', ...upload, filePath });
  }, [upload, uploadAPI]);

  // eslint-disable-next-line complexity
  useEffect(() => {
    let valueList: IFile[] = [];
    if (typeof value === 'string' && value) {
      valueList = [{ url: value }];
    } else if (Array.isArray(value)) {
      valueList = value.map(item => (typeof item === 'string' ? { url: item } : item));
    }
    const newList = valueList.filter(item => !fileList.some(file => file.url === item.url));
    if (!judgeIsEmpty(newList)) {
      setFileList([...fileList, ...newList]);
    }
  }, [fileList, multiple, setFileList, value]);

  const getValue = (fileList: IFile[]) => {
    const valueList = fileList.filter(({ status = 'done' }) => status === 'done');
    if (valueType === 'array') {
      return valueList;
    }
    const urlArr = valueList.map(item => item.url);
    if (valueType === 'string[]') {
      return urlArr;
    }
    return urlArr[0];
  };

  return (
    <TUploader
      {...args}
      maxCount={curMaxCount}
      multiple={multiple}
      fileList={fileList}
      onAfterRead={(e) => {
        const { file } = e.detail;
        const files = (Array.isArray(file) ? file : [file]).map(item => ({ ...item, status: 'uploading' }));
        setFileList([...fileList, ...files]);
        files.forEach((item) => {
          // eslint-disable-next-line complexity
          curUpload(item.url).then((res) => {
            // 取最新值
            const { fileList: curList } = values;
            let file = curList.find(({ url }) => url === item.url);
            if (file) {
              if (judgeIsSuccess(res)) {
                file.status = 'done';
                if (typeof res.data === 'object') {
                  file = res.data;
                } else {
                  file.url = res.data;
                }
              } else {
                file.status = 'failed';
              }
            } else {
              curList.push({ url: res.data, status: 'done' });
            }
            setFileList([...curList]);
            judgeIsSuccess(res) && onChange?.(getValue(curList));
          });
        });
      }}

      onDelete={(e) => {
        onDelete?.(e);
        const { fileList: curList } = values;
        curList.splice(e.detail.index, 1);
        setFileList([...curList]);
        onChange?.(getValue(curList));
      }}
    />
  );
});
