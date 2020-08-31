import { FocalPointPicker, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { LayoutSelector } from '../../components/enform/LayoutSelector/LayoutSelector';
import { URLInput } from "../../components/URLInput/URLInput";

const { __ } = wp.i18n;

const BLOCK_NAME = 'planet4-blocks/enform';
const home_page = window.p4en_vars.home;

export const ENFormSettings = ({attributes, setAttributes}) => {
    
  const {
    en_page_id,
    en_form_style,
    enform_goal,
    donate_button_checkbox,
    thankyou_url,
    campaign_logo,
  } = attributes;

  const {getCurrentPostType} = wp.data.select("core/editor");
  const currentPostType      = getCurrentPostType();

  let flattenedPages = [];
  let pagesByType;

  for (var i in window.p4en_vars.pages) {
    pagesByType = window.p4en_vars.pages[i].map(page => {
      return { label: page.name, value: page.id };
    });
    flattenedPages = flattenedPages.concat(
      { label: '-- ' + i, value: i }, // Page type label
      ...pagesByType
    );
  }

  const en_forms = window.p4en_vars.forms.map(form => {
    return { label: form.post_title, value: form.ID };
  });

  return (
    <InspectorControls>
      <PanelBody title={__('Form settings', 'planet4-blocks-backend')}>
        <div>
          <h3>{__('What style of column do you need?', 'p4ge')}</h3>
          <LayoutSelector 
            selectedOption={en_form_style || 'side-style'}
            onSelectedLayoutChange={() => {}}
            options={[
              {
                label: __( 'Page body / text size width. No background.', 'planet4-engagingnetworks-backend' ),
                image: home_page + 'images/enfullwidth.png',
                value: 'full-width',
                help: __( 'Use: on long pages (more than 5 screens) when list items are long (+ 10 words)<br>No max items<br>recommended.', 'planet4-engagingnetworks-backend' ),
              }, {
                label: __( 'Full page width. With background image.', 'planet4-engagingnetworks-backend' ),
                image: home_page + 'images/enfullwidthbg.png',
                value: 'full-width-bg',
                help: __( 'This form has a background image that expands the full width of the browser (aka "Happy Point").', 'planet4-engagingnetworks-backend' ),
              },
              {
                label: __( 'Form on the side.', 'planet4-engagingnetworks-backend' ),
                image: home_page + 'images/submenu-sidebar.jpg',
                value: 'side-style',
                help: __( 'Form will be added to the top of the page, on the right side for most languages and on the left side for Right-to-left(RTL) languages.', 'planet4-engagingnetworks-backend' ),
              },
            ]}
          />
        </div>

        <div>
          <ToggleControl 
            label={__( 'Use campaign logo', 'planet4-engagingnetworks-backend' )}
            value={campaign_logo}
            checked={campaign_logo}
            onChange={() => {}}
          />
          <SelectControl
            label={__( 'Engaging Network Live Pages', 'planet4-engagingnetworks-backend' )}
            value={en_page_id}
            options={[
              { label: 'No pages', value: 0 },
              ...flattenedPages
            ]}
            disabled={!flattenedPages.length}
            onChange={() => {}}
          />

          <SelectControl
            label={__( 'Select Goal', 'planet4-engagingnetworks-backend' )}
            value={enform_goal}
            options={[
              { label: __( '--- Select Goal ---', 'planet4-engagingnetworks-backend' ), value: 'not set' },
              { label: 'Petition Signup', value: 'Petition Signup' },
              { label: 'Action Alert', value: 'Action Alert' },
              { label: 'Contact Form', value: 'Contact Form' },
              { label: 'Other', value: 'Other' },
            ]}
            onChange={() => {}}
          />
        </div>
      </PanelBody>

      <PanelBody title={__('Thank You note settings', 'planet4-blocks-backend')}>
        <ToggleControl 
          label={__( 'Hide "DONATE" button in Thank You message', 'planet4-engagingnetworks-backend' )}
          value={donate_button_checkbox}
          checked={donate_button_checkbox}
          onChange={() => {}}
        />

        <URLInput
          label={ __( 'Thank You page URL', 'planet4-engagingnetworks-backend' ) }
          placeholder={ __( 'Enter "Thank you page" url', 'planet4-engagingnetworks-backend' ) }
          value={thankyou_url}
          onChange={() => {}}
          help={ __('Title, Subtitle, Social media message / icons and DONATE will not be shown', 'planet4-engagingnetworks-backend') }
        />
      </PanelBody>
    </InspectorControls>
  )
}
