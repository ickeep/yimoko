import axios from 'axios';
import COS, { UploadBody } from 'cos-nodejs-sdk-v5';

import buildConf from '../craco.config';

let cosConf: Record<string, string> = {};
const defaultConf: Record<string, string> = {
  Bucket: 'npm-1251135819',
  Region: 'ap-guangzhou',
};

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  cosConf = { ...defaultConf, ...require('./config.local.ts').default };
} catch (e) {
  cosConf = {
    ...defaultConf,
    SecretId: process.env.SECRETID ?? '',
    SecretKey: process.env.SECRETKEY ?? '',
  };
}

const cos = new COS({
  SecretId: cosConf.SecretId,
  SecretKey: cosConf.SecretKey,
});

const upload = (key: string, body: UploadBody) => {
  cos.putObject({
    Bucket: cosConf.Bucket,
    Region: cosConf.Region,
    Key: key,
    Body: body,
  }, (err, data) => {
    err ? console.error(err) : console.log(data);
  });
};

const { devCSS, prodCSS, devJS, prodJS } = buildConf.cdn;
const files = Array.from(new Set([...devCSS, ...prodCSS, ...devJS, ...prodJS]));

files.forEach((file) => {
  axios.get(file, { responseType: 'arraybuffer' }).then((res) => {
    const key = file.replace(/https:\/\/(cdn.jsdelivr.net\/npm|unpkg.com)\//, '').replace(/@(\d+)/, '/$1');
    upload(key, res.data);
  });
});
