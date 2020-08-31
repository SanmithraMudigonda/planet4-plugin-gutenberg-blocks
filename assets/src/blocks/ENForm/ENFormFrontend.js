
import { ShareButtonsFrontend } from './ShareButtonsFrontend'

export const ENFormFrontend = ({attributes, setAttributes}) => {

  const {
    en_page_id,
    en_form_style,
    enform_goal,
    title,
    description,
    content_title,
    content_title_size,
    content_description,
    donate_button_checkbox,
    thankyou_url,
    thankyou_title,
    thankyou_subtitle,
    thankyou_donate_message,
    thankyou_social_media_message,
    background_image_src,
    background_image_srcset,
    background_image_sizes,
    background_image_focus,
    text_below_button,
    button_text,
  } = attributes;

  const section_style = ((style) => {
    switch (style) {
      case 'side-style':
        return 'block-header block-wide';
      case 'full-width-bg':
        return 'block-footer block-wide';
    }
  })(en_form_style);

  // todo: get campaign data
  const campaign_style = ''; // ??
  const error_msg = '';
  const form = 'Form';
  const campaign_data = { logo_path: '', template: '' };
  const redirect_url = '';
  const enblock_submit = '';

  // todo: get image from background (imageId)

  const is_side_style = en_form_style === 'side_style';

  return (
    <section className={`block enform-wrap enform-${en_form_style} ${section_style}`}>
      (background_image_src &&
        <picture>
          <img src={background_image_src}
            style={{objectPosition: background_image_focus}}
            border="0"
            srcSet={background_image_srcset}
            sizes={background_image_sizes}
          />
        </picture>)

      <div className="caption-overlay"></div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">

            (is_side_style &&
              <div className="form-caption">
                (campaign_logo &&
                  <img src={ campaign_data.logo_path }
                      alt={ campaign_data.template }
                      className="campaign-logo" />
                )
                <h1>{content_title}</h1>
                <p>{content_description}</p>
              </div>
            )


            <div className="enform" id="enform" data-redirect-url={redirect_url}>

              <div id="enform-content">
                <div className="title-and-description">
                  (title && 
                    <h2>{title}</h2>
                  )
                  (is_side_style &&
                    <div className="enform-extra-header-placeholder"></div>
                  )
                  <div className="form-description">{description}</div>
                </div>

                <div className="form-container">
                  <form id="p4en_form" name="p4en_form" method="post" novalidate>
                    <input type="hidden" name="enblock_submit" value={ enblock_submit } />
                    <input type="hidden" name="en_page_id" value={ en_page_id } />
                    <input type="hidden" name="thankyou_title" value={ thankyou_title } />
                    <input type="hidden" name="thankyou_subtitle" value={ thankyou_subtitle } />
                    <input type="hidden" name="enform_goal" id="enform_goal" value={ enform_goal } />

                    { error_msg }
                    <div className={ en_form_style == 'full-width-bg' ? 'row' : '' }>
                      <div className={ en_form_style == 'full-width-bg' ? 'col-md-8' : '' }>
                          { form }
                      </div>

                      <div className={ en_form_style == 'full-width-bg' ? 'col-md-4 submit' : ' submit' }>
                        <button type="submit" form="p4en_form" name="p4en_form_save_button" id="p4en_form_save_button" className="btn btn-primary btn-block" >
                          { '' !== button_text ? button_text : __( 'Sign', 'planet4-engagingnetworks' ) }
                          <div className="three-quarters en-spinner" id="spinner" style="display:none;">...</div>
                        </button>
                        <div className="enform-notice"></div>
                        (en_form_style == 'full-width-bg &&
                          <div className="enform-legal">
                            <p>{text_below_button}</p>
                          </div>
                        )
                      </div>

                      (en_form_style !== 'full-width-bg' &&
                        <div className="enform-legal">
                          <p>{text_below_button}</p>
                        </div>
                      )
                    </div>
                  </form>
                </div>

              </div>

              thank_you()
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


const thank_you = () => {
  return (
    <div 
      className={'thankyou ' + (en_form_style != 'side-style' ? 'full-width': '')}
      style="display: none">
      (error &&
        <span className="enform-error">{ error }</span>
      )

      <header>
        <h2 className="page-section-header">{ thankyou_title }</h2>
      </header>
      <p className="page-section-description">{ thankyou_subtitle }</p>

      <div className="sub-section formblock-flex">

        <div className="form-group">
          <h5>{ thankyou_social_media_message }</h5>
        </div>

        <div className="social-media form-group">
          <ShareButtonsFrontend />
        </div>

        (! donate_button_checkbox &&
          <div className="form-group">
            <h5>{thankyou_donate_message}</h5>
          </div>

          <div className="form-group">
            <a href="{donatelink}" className="btn btn-primary btn-block">{donate_text}</a>
          </div>
        )

      </div>
    </div>
  )
}