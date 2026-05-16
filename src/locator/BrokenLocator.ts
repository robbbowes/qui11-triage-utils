import { LocatorKind } from "./LocatorKind";

/**
 * Information on the locator which wasn't found in the DOM, but is similar 
 * to one or more locators that were found.
 * This is used to provide more helpful error messages when a locator is broken, 
 * by showing the closest matches that were found in the DOM.
 * For example, if the user tries to getByRole('button', { name: 'Submit' }), 
 * but there is no button with the accessible name 'Submit', we can return a 
 * BrokenLocator with kind='role', value='button', description="getByRole('button', 
 * { name: 'Submit' })", targetName='Submit', and candidates=['Cancel', 'Submit?'] 
 * (if there are buttons with the accessible names 'Cancel' and 'Submit?').
 */
export interface BrokenLocator {
    kind: LocatorKind; // e.g. 'role', 'text', 'id', etc.
    value: string; // e.g. getByRole('button', { name: 'Submit' }) -> 'button'
    description: string; // e.g. "getByRole('button', { name: 'Submit' })"
    targetName?: string; // e.g. getByRole('button', { name: 'Submit' }) -> 'Submit'
    candidates?: readonly string[]; // What was actually on the page
    humanHint?: string;
}
