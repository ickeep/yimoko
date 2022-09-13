import { isTemplate, template, templateConvertForProps } from './template';

describe('template', () => {
  test('isTemplate', () => {
    expect(isTemplate('<%= name %>')).toBeTruthy();
    expect(isTemplate(' <%=name%> ')).toBeTruthy();
    expect(isTemplate('<%= name >')).toBeFalsy();
    expect(isTemplate(null)).toBeFalsy();
  });

  test('template', () => {
    expect(template(' <%=name %>', {})).toBe(undefined);
    expect(template()).toBe('');
    // @ts-ignore
    expect(template(true, {})).toBe(true);
    expect(template('<%= name%> ', { name: 'keep' })).toBe('keep');
    const user = { name: 'keep', getID: () => '1', err: new Error('error') };
    expect(template(' <%=user%> ', { user })).toEqual(user);
    expect(template('<%=user%> name:<%=user.name%> ', { user })).toBe('[object Object] name:keep ');

    expect(template('<%=user.err%> name:<%=user.xxx.xxx%>', { user })).toBe('Error: error name:');
    // @ts-ignore
    expect(template('<%=user.err%> name:<%=user.xxx.xxx%>', null)).toBe(' name:');
    expect(template('<%=user.err%> name:<%=user.xxx.xxx%>', undefined)).toBe(' name:');
    expect(template('<%=user.err%> name:<%=user.xxx.xxx%>', () => '')).toBe(' name:');
  });

  test('templateConvertForProps', () => {
    expect(templateConvertForProps({ name: '<%= name %>' }, { name: 'keep' })).toEqual({ name: 'keep' });
    expect(templateConvertForProps({})).toEqual({});
  });
});
