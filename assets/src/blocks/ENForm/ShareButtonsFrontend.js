
const { __ } = wp.i18n;

export const ShareButtonsFrontend = (social, accounts) => {
  const {
    link,
    title,
    description
  } = social;

  const svgicon = (name) => {
    return '';
  }

  const share = (action, label) => {
    dataLayer.push({
      event: 'uaevent', 
      eventCategory: 'Social Share',
      eventAction: action,
      eventLabel: label
    })
  }

  return (
    <div class="share-buttons">
      <a href="https://wa.me/?text={link}"
        onClick={share('Whatsapp', link)}
        target="_blank" 
        className="share-btn whatsapp">
        {svgicon('whatsapp')}
        <span className="sr-only">{__( 'Share on', 'planet4-master-theme' )} Whatsapp</span>
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u={link}"
        onClick={share('Facebook', link)}
        target="_blank"
        className="share-btn facebook">
        {svgicon('facebook-f')}
        <span className="sr-only">{__( 'Share on', 'planet4-master-theme' )} Facebook</span>
      </a>
      <a href="https://twitter.com/share?url={link}&text={title}{% if social.description %} - {{ social.description|striptags }}{% endif %} via @{{ accounts.twitter }}&related={{ accounts.twitter }}"
        onClick={share('Twitter', link)}
        target="_blank"
        className="share-btn twitter">
        {svgicon('twitter')}
        <span className="sr-only">{__( 'Share on', 'planet4-master-theme' )} Twitter</span>
      </a>
      <a href="mailto:?subject={title}&body={% if social.description %}{{ social.description|striptags }} {% endif %}{social.link}"
        onClick={share('Email', link)}
        target="_blank"
        className="share-btn email">
        {svgicon('envelope')}
        <span className="sr-only">{__( 'Share via', 'planet4-master-theme' )} Email</span>
      </a>
    </div>
  )
}

// public function svgicon( $name ) {
//   $svg_icon_template = '<svg viewBox="0 0 32 32" class="icon"><use xlink:href="' . $this->theme_dir . '/images/symbol/svg/sprite.symbol.svg#' . $name . '"></use></svg>';
//   return new \Twig_Markup( $svg_icon_template, 'UTF-8' );
// }