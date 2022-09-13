import { judgeIsEmpty } from '@yimoko/store';
import { get } from 'lodash-es';

// 小程序限制了 eval 和 new Function 的使用，所以简单实现 template 转换

export const isTemplate = (value: any) => typeof value === 'string' && /<%=\s*[^<%=>]+\s*%>/.test(value);

// 简易的模版转化
export const template = (text = '', params: Record<string, any> = {}) => {
  if (typeof text !== 'string') {
    return text;
  }
  // 单一变量 即取值
  if (/^\s*<%=\s*[^<%=>]+\s*%>\s*$/.test(text)) {
    // eslint-disable-next-line newline-per-chained-call
    return get(params, text.trim().slice(3, -2).trim());
  }
  if (judgeIsEmpty(params)) {
    return text.replace(/<%=\s*[^<%=>]+\s*%>/g, '');
  }
  return text.replace(/<%=\s*[^<%=>]+\s*%>/g, match => `${get(params, match.slice(3, -2).trim()) ?? ''}`);
};

// 简易模版字符串取值，实现简易低代码
export const templateConvertForProps = (props: Record<string, any>, obj: Record<string, any> = {}) => {
  if (judgeIsEmpty(props)) {
    return props;
  }
  const newProps = { ...props };
  Object.entries(props).forEach(([key, value]) => isTemplate(value) && (newProps[key] = template(value, obj)));
  return newProps;
};

