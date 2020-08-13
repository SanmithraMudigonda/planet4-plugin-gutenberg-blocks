import {RawHTML, useCallback, useState} from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	Tooltip
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { URLInput } from '../../components/URLInput/URLInput';
import { TimelineNode } from './TimelineNode';
import { debounce } from 'lodash';

const { RichText } = wp.blockEditor;
const { __ } = wp.i18n;

const languages = [
  {label: 'Afrikaans', value: 'af'},
  {label: 'Arabic', value: 'ar'},
  {label: 'Armenian', value: 'hy'},
  {label: 'Basque', value: 'eu'},
  {label: 'Belarusian', value: 'be'},
  {label: 'Bulgarian', value: 'bg'},
  {label: 'Catalan', value: 'ca'},
  {label: 'Chinese', value: 'zh-cn'},
  {label: 'Croatian / Hrvatski', value: 'hr'},
  {label: 'Czech', value: 'cz'},
  {label: 'Danish', value: 'da'},
  {label: 'Dutch', value: 'nl'},
  {label: 'English', value: 'en'},
  {label: 'English (24-hour time)', value: 'en-24hr'},
  {label: 'Esperanto', value: 'eo'},
  {label: 'Estonian', value: 'et'},
  {label: 'Faroese', value: 'fo'},
  {label: 'Farsi', value: 'fa'},
  {label: 'Finnish', value: 'fi'},
  {label: 'French', value: 'fr'},
  {label: 'Frisian', value: 'fy'},
  {label: 'Galician', value: 'gl'},
  {label: 'Georgian', value: 'ka'},
  {label: 'German / Deutsch', value: 'de'},
  {label: 'Greek', value: 'el'},
  {label: 'Hebrew', value: 'he'},
  {label: 'Hindi', value: 'hi'},
  {label: 'Hungarian', value: 'hu'},
  {label: 'Icelandic', value: 'is'},
  {label: 'Indonesian', value: 'id'},
  {label: 'Irish', value: 'ga'},
  {label: 'Italian', value: 'it'},
  {label: 'Japanese', value: 'ja'},
  {label: 'Korean', value: 'ko'},
  {label: 'Latvian', value: 'lv'},
  {label: 'Lithuanian', value: 'lt'},
  {label: 'Luxembourgish', value: 'lb'},
  {label: 'Malay', value: 'ms'},
  {label: 'Myanmar', value: 'my'},
  {label: 'Nepali', value: 'ne'},
  {label: 'Norwegian', value: 'no'},
  {label: 'Polish', value: 'pl'},
  {label: 'Portuguese', value: 'pt'},
  {label: 'pt-br', value: 'Portuguese (Brazilian)'},
  {label: 'Romanian', value: 'ro'},
  {label: 'Romansh', value: 'rm'},
  {label: 'Russian', value: 'ru'},
  {label: 'Serbian - Cyrillic', value: 'sr-cy'},
  {label: 'Serbian - Latin', value: 'sr'},
  {label: 'Sinhalese', value: 'si'},
  {label: 'Slovak', value: 'sk'},
  {label: 'Slovenian', value: 'sl'},
  {label: 'Spanish', value: 'es'},
  {label: 'Swedish', value: 'sv'},
  {label: 'Tagalog', value: 'tl'},
  {label: 'Tamil', value: 'ta'},
  {label: 'Taiwanese', value: 'zh-tw'},
  {label: 'Telugu', value: 'te'},
  {label: 'Thai', value: 'th'},
  {label: 'Turkish', value: 'tr'},
  {label: 'Ukrainian', value: 'uk'},
  {label: 'Urdu', value: 'ur'},
];

const position = [
	{label: 'Bottom', value: 'bottom'},
	{label: 'Top', value: 'top'},
]

let url_desc  = __(
	'Enter the URL of the Google Sheets spreadsheet containing your timeline data.',
	'planet4-blocks-backend'
);
url_desc += '<br><a href="https://timeline.knightlab.com/#make" target="_blank" rel="noopener noreferrer">';
url_desc += __(
	'See the TimelineJS website for a template GSheet.',
	'planet4-blocks-backend'
);
url_desc += '</a><br>';
url_desc += __(
	'Copy this, add your own timeline data, and publish to the web.',
	'planet4-blocks-backend'
);
url_desc += '<br>';
url_desc += __(
	"Once you have done so, use the URL from your address bar (not the one provided in Google's 'publish to web' dialog).",
	'planet4-blocks-backend'
);

const renderEdit = ({ google_sheets_url, language, timenav_position, start_at_end }, toAttribute) => {
  // Using a state to prevent the input losing the cursor position, a React issue reported multiple times
  const [ sheetURL, setSheetURL ] = useState(google_sheets_url);
  const debounceSheetURLUpdate = useCallback(debounce(toAttribute('google_sheets_url'), 300), []);

  return (
    <InspectorControls>
      <PanelBody title={__('Setting', 'planet4-blocks-backend')}>
        <URLInput
          label={__('Google Sheets URL', 'planet4-blocks-backend')}
          placeholder={__('Enter URL', 'planet4-blocks-backend')}
          help={ <RawHTML>{url_desc}</RawHTML> }
          value={sheetURL}
          onChange={
            value => {
              setSheetURL(value)
              debounceSheetURLUpdate(value)
            }
          }
      />

        <SelectControl
          label={__('Language', 'planet4-blocks-backend')}
          value={language}
          options={languages}
          onChange={toAttribute('language')}
        />

        <SelectControl
          label={__('Timeline navigation position', 'planet4-blocks-backend')}
          value={timenav_position}
          options={position}
          onChange={toAttribute('timenav_position')}
        />

        <CheckboxControl
          label={__('Start at end', 'planet4-blocks-backend')}
          help={__('Begin at the end of the timeline', 'planet4-blocks-backend')}
          value={start_at_end}
          checked={start_at_end}
          onChange={toAttribute('start_at_end')}
        />

      </PanelBody>
    </InspectorControls>
	)
}

const renderView = (attributes, toAttribute) => {
  return (
    <section className="block timeline-block">
      <Tooltip text={__('Edit text', 'planet4-blocks-backend')}>
        <header className="articles-title-container">
          <RichText
            tagName="h2"
            className="page-section-header"
            placeholder={__('Enter title', 'planet4-blocks-backend')}
            value={attributes.timeline_title}
            onChange={toAttribute('timeline_title')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            characterLimit={40}
            multiline="false"
          />
        </header>
      </Tooltip>
      <RichText
        tagName="p"
        className="page-section-description"
        placeholder={__('Enter description', 'planet4-blocks-backend')}
        value={attributes.description}
        onChange={toAttribute('description')}
        keepPlaceholderOnFocus={true}
        withoutInteractiveFormatting
        characterLimit={200}
      />
      {
        ! attributes.google_sheets_url
        ? <div className="block-edit-mode-warning components-notice is-warning">
            { __( 'Please include a Sheet URL.', 'planet4-blocks' ) }
          </div>
        : <TimelineNode {...attributes} />
      }
		</section>
	)
}

export const TimelineEditor = ({ isSelected, attributes, setAttributes }) => {
  const toAttribute = attributeName => value => setAttributes({ [attributeName]: value });

  return (
    <div>
      {
        isSelected && renderEdit(attributes, toAttribute)
      }
      {
        renderView(attributes, toAttribute)
      }
    </div>
  );
}