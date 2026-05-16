import type { LocatorKind } from "./LocatorKind";

export interface InitialLocator {
    // The kind of locator (e.g. 'role', 'placeholder', 'text', etc.)
    kind: LocatorKind;
    
    // The primary identifier (role name, the test id, etc.)
    value: string; 
    
    // A human readable description of the locator 
    // (e.g. "role=button[name='Submit']")
    description: string; 
        
    // Additional arguments needed to construct the locator 
    // (e.g. for getByRole, the role name is not enough, 
    // we also need the accessible name)
    args?: readonly unknown[]; 
   
    // The original method used to construct the locator 
    // (e.g. getByRole, locator('css=...'), etc.)
    originalMethod?: string; 
   
    // A human readable hint in the .describe(...) to give context as to 
    // what this locator is targeting (e.g. "a button with the text 'Submit'")
    humanHint?: string; 
}
