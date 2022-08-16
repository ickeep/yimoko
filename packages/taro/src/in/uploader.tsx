import { Uploader as TUploader } from '@antmjs/vantui';
import { UploaderProps as TUploaderProps } from '@antmjs/vantui/types/uploader';
import { observer } from '@formily/react';

export interface UploaderProps extends Omit<TUploaderProps, 'fileList'> {
  onChange?: (value?: string | any[]) => void
}

export const Uploader = observer((props: UploaderProps) => {
  const { onChange, ...args } = props;

  return (
    <TUploader
      {...args}
    // onC={(e) => {
    //   onInput?.(e);
    //   onChange?.(e.detail.value);
    // }}
    />
  );
});
