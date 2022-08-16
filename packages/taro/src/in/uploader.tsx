import { Uploader as TUploader } from '@antmjs/vantui';
import { UploaderProps as TUploaderProps } from '@antmjs/vantui/types/uploader';
import { observer } from '@formily/react';
import { strToArr } from '@yimoko/store';
import { useEffect, useState } from 'react';

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

  const [fileList, setFileList] = useState<IFile[]>([]);

  // eslint-disable-next-line complexity
  useEffect(() => {
    // todo 处理下载中的文件
    if (typeof value === 'string' && value) {
      const list = multiple ? strToArr(value, splitter).map(item => ({ url: item })) : [{ url: value }];
      setFileList(list);
    } else if (Array.isArray(value)) {
      setFileList(value.map(item => (typeof item === 'string' ? { url: item } : item)));
    }
  }, [multiple, splitter, value]);

  const getValue = (fileList: IFile[]) => {
    if (valueType === 'array') {
      return fileList;
    }
    const urlArr = fileList.map(item => item.url);
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
      onAfterRead={(file: any) => {
        console.log(file);
      }}
      onDelete={(e) => {
        onDelete?.(e);
        const newList = [...fileList];
        newList.splice(e.detail.index, 1);
        setFileList(newList);
        onChange?.(getValue(newList));
      }}
    // onC={(e) => {
    //   onInput?.(e);
    //   onChange?.(e.detail.value);
    // }}
    />
  );
});
