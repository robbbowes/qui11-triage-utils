export type LocatorKind = 
    | 'role' // getByRole
    | 'placeholder' // getByPlaceholder
    | 'text' // getByText
    | 'label' // getByLabel
    | 'altText' // getByAltText
    | 'title' // getByTitle
    | 'testid' // getByTestId
    | 'id' // locator('#id')
    | 'xpath' // locator('xpath=//div')
    | 'css' // locator('css=div.class')
    | 'name' // locator('[name="value"]')
    | 'class' // locator('.class')
    | 'linktext' // locator('text=link text')
