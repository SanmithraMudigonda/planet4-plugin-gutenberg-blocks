import {ENFormFrontend as Frontend} from './ENFormFrontend';
import {ENFormInPlaceEdit as InPlaceEdit} from './ENFormInPlaceEdit';
import {ENFormSettings as SidebarSettings} from './ENFormSettings';
import { Component, Fragment } from '@wordpress/element';

export const ENFormEditor = ({ attributes, setAttributes, isSelected }) => {

  const { en_form_style } = attributes;

  if (! en_form_style || en_form_style.length <= 0) {
    setAttributes({en_form_style: 'side-style'});
  }

  return (
    isSelected
      ? renderEdit({attributes}, setAttributes) 
      : renderView({attributes})
  );
}

const renderView = ({attributes}) => <Frontend {...{attributes}} />

const renderEdit = ({attributes}, setAttributes) => {
  const charLimit = { title: 40, description: 400 };
  const params = {attributes, charLimit, setAttributes};

  return (
    <Fragment>
      <InPlaceEdit {...params} />
      <SidebarSettings  {...params} />
    </Fragment>
  );
}

