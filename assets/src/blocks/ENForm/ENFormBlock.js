import {ENForm} from './ENForm.js';
import {ENFormEditor} from './ENFormEditor';

const home_page = window.p4en_vars.home;

export class ENFormBlock {
  constructor() {
    const {registerBlockType} = wp.blocks;

    registerBlockType('planet4-blocks/enform', {
      title: 'EN Form',
      icon: 'feedback',
      category: 'planet4-blocks',

      styles: [
        {name: 'full-width-bg', label: 'Full width with background', image: home_page + 'images/enfullwidthbg.png'},
        {name: 'full-width', label: 'Full width'},
        {name: 'side-style', label: 'Form on the side', isDefault: true},
      ],
      // Transform the shortcode into a Gutenberg block
      // this is used when a user clicks "Convert to blocks"
      // on the "Classic Editor" block
      attributes: {
        en_page_id: { type: 'integer', },
        enform_goal: { type: 'string', },
        en_form_style: { type: 'string', },
        title: { type: 'string', },
        description: { type: 'string', },
        campaign_logo: { type: 'boolean', },
        content_title: { type: 'string', },
        content_title_size: { type: 'string', },
        content_description: { type: 'string', },
        button_text: { type: 'string', },
        text_below_button: { type: 'string', },
        thankyou_title: { type: 'string', },
        thankyou_subtitle: { type: 'string', },
        thankyou_donate_message: { type: 'string', },
        thankyou_social_media_message: { type: 'string', },
        donate_button_checkbox: { type: 'boolean', },
        custom_donate_url: { type: 'string', },
        thankyou_url: { type: 'string', },
        background: { type: 'integer', },
        en_form_id: { type: 'integer', },
      },
      edit: ENFormEditor,
      save() { return null }
    });
  };
}
