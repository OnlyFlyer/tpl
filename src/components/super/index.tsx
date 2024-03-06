import React from 'react';

export default class extends React.Component<any> {
  constructor (props: any) {
    super(props);
    console.log(props, '--props');
    // @ts-ignore
    // console.log(this?.props, '--this.props');
  }
  render() {
    console.log(this.props, '--10');
    return 'super'
  };
};
