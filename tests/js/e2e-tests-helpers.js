import {
  getAllBlocks,
  selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

/**
 * Selects a block by name.
 *
 * @param {string} name The block name.
 */
export const selectBlockByName = async ( name ) => {
  await selectBlockByClientId(
    ( await getAllBlocks() ).find( ( block ) => block.name === name ).clientId
  );
};

/**
 * This helper is specific to the Color Picker component.
 * It selects a Color by name, using the aria-label property.
 *
 * @param {string} name Color name.
 */
export const selectColorByName = async ( name ) => {
  const [ element ] = await page.$x( `//div[contains(@class,"edit-post-sidebar")]//button[contains(@aria-label,"${ name }")]` );
  await element.click();
};

/**
 * Clicks an element containing certain text.
 *
 * @param {string} elementExpression An XPath expression to locate the element.
 * @param {string} text The text to match.
 */
export const clickElementByText = async ( elementExpression, text ) => {
  const [ element ] = await page.$x( `//${ elementExpression }[contains(text(),"${ text }")]` );
  await element.click();
};

/**
 * Types in an input element based on its label.
 *
 * @param {string} label Text of the label before the text input.
 * @param {string} value Value to be applied to the input.
 */
export const typeInInputWithLabel = async ( label, value ) => {
  const [ inputEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::input[@class="components-text-control__input"]` );
  const propertyHandle = await inputEl.getProperty('id');
  const inputId = await propertyHandle.jsonValue();

  await page.type( `#${ inputId }`, value);
};

/**
 * Opens a Sidebar panel containing certain title.
 *
 * @param {string} title The sidebar panel title.
 */
export const openSidebarPanelWithTitle = async ( title ) => {
  // Check if the sidebar panel exists.
  await page.waitForXPath( `//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]` );

  // Only open panel if it's not expanded already (aria-expanded check).
  const [ panel ] = await page.$x(
    `//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][@aria-expanded="false"][contains(text(),"${ title }")]`
  );

  if ( panel ) {
    await panel.click();
  }
};
