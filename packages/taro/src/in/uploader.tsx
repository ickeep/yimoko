import { Uploader as TUploader } from '@antmjs/vantui';
import { UploaderProps as TUploaderProps } from '@antmjs/vantui/types/uploader';
import { observer } from '@formily/react';
import Taro from '@tarojs/taro';
import { judgeIsEmpty, strToArr, useBaseStore } from '@yimoko/store';
import { useCallback, useEffect } from 'react';

export interface UploaderProps extends Omit<TUploaderProps, 'fileList'> {
  valueType?: 'string' | 'string[]' | 'array'
  value?: string | string[] | Array<{ url: string } & Record<string, any>>
  onChange?: (value?: string | any[]) => void
  splitter?: string
}

export interface IFile {
  url: string
  status?: 'uploading' | 'failed' | 'done'
  message?: string,
}

export const Uploader = observer((props: UploaderProps) => {
  const { onChange, value, valueType, onDelete, splitter = ',', multiple, ...args } = props;
  const { values: { fileList }, setValuesByField } = useBaseStore<{ fileList: IFile[] }>({ defaultValues: { fileList: [] }, api: {} });

  const setFileList = useCallback((fileList: IFile[]) => {
    setValuesByField('fileList', fileList);
  }, [setValuesByField]);

  // eslint-disable-next-line complexity
  useEffect(() => {
    let valueList: IFile[] = [];
    if (typeof value === 'string' && value) {
      valueList = multiple ? strToArr(value, splitter).map(item => ({ url: item })) : [{ url: value }];
    } else if (Array.isArray(value)) {
      valueList = value.map(item => (typeof item === 'string' ? { url: item } : item));
    }
    const newList = valueList.filter(item => !fileList.some(file => file.url === item.url));
    if (!judgeIsEmpty(newList)) {
      setFileList([...fileList, ...newList]);
    }
  }, [fileList, multiple, setFileList, splitter, value]);

  const getValue = (fileList: IFile[]) => {
    const valueList = fileList.filter(({ status = 'done' }) => status === 'done');
    if (valueType === 'array') {
      return valueList;
    }
    const urlArr = valueList.map(item => item.url);
    if (valueType === 'string[]') {
      return urlArr;
    }
    return urlArr.join(splitter);
  };

  return (
    <TUploader
      {...args}
      multiple={multiple}
      fileList={fileList}
      onAfterRead={(e) => {
        const { file } = e.detail;
        const fiels = (Array.isArray(file) ? file : [file]).map(item => ({ ...item, status: 'uploading' }));
        const newList = [...fileList, ...fiels];
        setFileList(newList);

        fiels.forEach((item) => {
          Taro.uploadFile({
            url: 'https://www.baidu.com/', filePath: item.url, name: 'file',
            success: (res) => {
              const file = newList.find(({ url }) => url === item.url);

              if (file) {
                file.status = 'done';
                file.url = res.data;
                setFileList(newList);
              }
            },
            fail: () => {
              const file = newList.find(({ url }) => url === item.url);
              if (file) {
                file.status = 'failed';
                setFileList(newList);
              }
            },
          });
        });
      }}
      onDelete={(e) => {
        onDelete?.(e);
        const newList = [...fileList];
        newList.splice(e.detail.index, 1);
        setFileList(newList);
        onChange?.(getValue(newList));
      }}
    />
  );
});
