import { NavBar as TNavBar } from '@antmjs/vantui';
import { NavBarProps as TNavBarProps } from '@antmjs/vantui/types/nav-bar';

import { route } from '../adapter/route';


export const NavBar = (props: TNavBarProps) => {
  const { onClickLeft, ...args } = props;

  return (
    <TNavBar {...args} onClickLeft={(e) => {
      if (!onClickLeft) {
        route.back();
      } else {
        onClickLeft(e);
      }
    }} />
  );
};
