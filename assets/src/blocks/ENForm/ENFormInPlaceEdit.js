import { Fragment } from '@wordpress/element';

const { RichText } = wp.editor;
const { __ } = wp.i18n;

export const ENFormInPlaceEdit = ({attributes, setAttributes}) => {
  const { 
    en_form_style, 
    background_image_src,
    background_image_focus,
    title,
    description,
    content_title,
    content_description,
    content_title_size,
    campaign_logo,
    thankyou_url,
    button_text,
  } = attributes;
  
  const toAttribute = (attributeName) => {
    return value => {
      setAttributes({ [attributeName]: value });
    }
  }

  const style_has_image = en_form_style === 'full-width-bg' || en_form_style === 'side-style';
  const full_width = en_form_style === 'full-width-bg';
  const section_style = ((style) => {
    switch (style) {
      case 'side-style':
        return 'block-header block-wide';
      case 'full-width-bg':
        return 'block-footer block-wide';
    }
  })(en_form_style);

  return (
    <section 
      className={`block enform-wrap enform-${en_form_style} ${section_style}`}>
      {style_has_image && background_image_src &&
        <picture>
          <img src={background_image_src}
            style={{objectPosition: background_image_focus}}
            border="0"
            srcset={background_image_srcset}
            sizes={background_image_sizes}
          />
        </picture>
      }

      <div className="container">
        <div className="row">
          <div className="col-md-12">

            {en_form_style === 'side-style' &&
              <div className="form-caption">
                {campaign_logo &&
                  <img src={ campaign_logo }
                      alt={''}
                      className="campaign-logo" />
                }
                <RichText
                  tagName={content_title_size}
                  value={content_title}
                  onChange={toAttribute('content_title')}
                  placeholder={__('Enter title', 'planet4-blocks-backend')}
                  keepPlaceholderOnFocus={true}
                  withoutInteractiveFormatting
                  characterLimit={60}
                  multiline="false"
                />
                <RichText
                  tagName="p"
                  value={content_description}
                  onChange={toAttribute('content_description')}
                  placeholder={__('Enter description', 'planet4-blocks-backend')}
                  keepPlaceholderOnFocus={true}
                  withoutInteractiveFormatting
                  characterLimit={400}
                />
              </div>
            }

            <div className="enform">
              <div id="enform-content">

							  <div className="title-and-description">
                  <RichText 
                    tagName="h2"
                    value={title}
                    onChange={toAttribute('title')}
                    placeholder={__('Enter form title', 'planet4-blocks-backend')}
                    keepPlaceholderOnFocus={true}
                    withoutInteractiveFormatting
                    characterLimit={60}
                    multiline="false"
                  />
                  {en_form_style === 'side-style' &&
                    <div className={'enform-extra-header-placeholder'}></div>
                  }

                  <RichText
                    tagName="div"
                    value={description}
                    className="form-description"
                    onChange={toAttribute('description')}
                    placeholder={__('Enter form description', 'planet4-blocks-backend')}
                    keepPlaceholderOnFocus={true}
                    withoutInteractiveFormatting
                    characterLimit={400}
                  />
                </div>

                <div className="form-container">
                  { form(attributes) }
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>  
  )
}

const form = (attributes) => {
  const {
    button_text,
    text_below_button,
    en_form_style
  } = attributes;

  const full_width = en_form_style === 'full-width-bg';

  return (
    <form id="p4en_form" name="p4en_form">
      <div className={full_width ? 'row' : ''}>
        = Form =
      </div>

      <div className={full_width ? 'col-md-4 submit' : 'submit'}>
        <RichText
          tag="button"
          id="p4en_form_save_button"
          className={'btn btn-primary btn-block' + (full_width ? ' w-auto' : '')}
          value={ button_text || __( 'Sign', 'planet4-engagingnetworks' ) }
        />
        {full_width &&
          <div className="enform-legal">
            <RichText 
              tagName="p"
              value={text_below_button}
            />
          </div>
        }
      </div>
      {! full_width &&
        <div className="enform-legal">
          <RichText 
            tagName="p"
            value={text_below_button}
          />
        </div>
      }
    </form>
  )
}
