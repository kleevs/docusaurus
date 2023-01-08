import React from 'react';
import Admonition from '@theme-original/Admonition';
import { Diagram } from '@docu/diagram';
import { renderToString } from 'react-dom/server'

export default function AdmonitionWrapper(props) {
  if (props.type === 'diagram') {
      const id = `id${new Date().getTime()}${Math.round(Math.random() * 1000)}`;
      console.log(renderToString(props.children))
    return <Diagram {...props} id={id} type='graph TD' />
  }
  return (
    <>
      <Admonition {...props} />
    </>
  );
}
