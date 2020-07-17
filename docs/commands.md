| Name | Description | Available |
|---|---|---|
|accept alert| Affects a currently showing alert. This command instructs Selenium to accept it.|❌|
|accept confirmation| Affects a currently showing confirmation alert. This command instructs Selenium to accept it.|❌|
|add selection| Add a selection to the set of options in a multi-select element.|❌|
|answer prompt| Affects a currently showing alert prompt. This command instructs Selenium to provide the specified answer to it.|❌|
|assert| Check that a variable is an expected value. The variable's value will be converted to a string for comparison. The test will stop if the assert fails.|❌|
|assert alert| Confirm that an alert has been rendered with the provided text. The test will stop if the assert fails.|❌|
|assert checked|'Confirm that the target element has been checked. The test will stop if the assert fails.'|❌|
|assert confirmation|'Confirm that a confirmation has been rendered. The test will stop if the assert fails.'|❌|
|assert editable|'Confirm that the target element is editable. The test will stop if the assert fails.'|❌|
|assert element present| Confirm that the target element is present somewhere on the page. The test will stop if the assert fails.|❌|
|assert element not present| Confirm that the target element is not present anywhere on the page. The test will stop if the assert fails.|❌|
|assert not checked|'Confirm that the target element has not been checked. The test will stop if the assert fails.'|❌|
|assert not editable|'Confirm that the target element is not editable. The test will stop if the assert fails.'|❌|
|assert not selected value| Confirm that the value attribute of the selected option in a dropdown element does not contain the provided value. The test will stop if the assert fails.|❌|
|assert not text| Confirm that the text of an element does not contain the provided value.The test will stop if the assert fails.|❌|
|assert prompt|'Confirm that a JavaScript prompt has been rendered. The test will stop if the assert fails.'|❌|
|assert selected value| Confirm that the value attribute of the selected option in a dropdown element contains the provided value. The test will stop if the assert fails.|❌|
|assert selected label| Confirm that the label of the selected option in a dropdown element contains the provided value. The test will stop if the assert fails.|❌|
|assert text| Confirm that the text of an element contains the provided value.The test will stop if the assert fails.|❌|
|assert title| Confirm the title of the current page contains the provided text.The test will stop if the assert fails.|❌|
|assert value| Confirm the (whitespace-trimmed) value of an input field (or anything else with a value parameter). For checkbox/radio elementsthe value will be "on" or "off" depending on whether the element ischecked or not. The test will stop if the assert fails.|❌|
|dismiss confirmation| Affects a currently showing confirmation alert. This command instructs Selenium to dismiss it.|❌|
|dismiss prompt| Affects a currently showing alert prompt. This command instructs Selenium to dismiss it.|❌|
|check| 'Check a toggle-button (checkbox/radio).'|❌|
|click| Clicks on a target element (e.g. a link button checkbox or radio button).|✅|
|click at| Clicks on a target element (e.g. a link button checkbox or radio button). The coordinates are relative to the target element(e.g. 00 is the top left corner of the element) and are mostly usedto check effects that relay on them for example the material ripple effect.|❌|
|close| Closes the current window. There is no need to close the initial window IDE will re-use it; closing it may cause a performancepenalty on the test.|❌|
|debugger| 'Breaks the execution and enters debugger'|❌|
|do| Create a loop that executes the proceeding commands at least once. Terminate the branch with the repeat if command.|❌|
|double click| Double clicks on an element (e.g. a link button checkbox or radio button).|❌|
|double click at| Double clicks on a target element (e.g. a link button checkbox or radio button). The coordinates are relative to the targetelement (e.g. 00 is the top left corner of the element) and are mostlyused to check effects that relay on them for example the materialripple effect.|❌|
|drag and drop to object| 'Drags an element and drops it on another element.'|❌|
|echo| Prints the specified message into the third table cell in your Selenese tables. Useful for debugging.|❌|
|edit content| Sets the value of a content editable element as if you typed in it.|❌|
|else| Part of an if block. Execute the commands in this branch when an if and/or else if condition are not met. Terminate the branchwith the end command.|❌|
|else if| Part of an if block. Execute the commands in this branch when an if condition has not been met. Terminate the branch with theend command.|❌|
|end| Terminates a control flow block for if while and times.|❌|
|execute script| Executes a snippet of JavaScript in the context of the currently selected frame or window. The script fragment will be executedas the body of an anonymous function.  To store the return value usethe 'return' keyword and provide a variable name in the value input field.|❌|
|execute async script| Executes an async snippet of JavaScript in the context of the currently selected frame or window. The script fragment will beexecuted as the body of an anonymous function and must return a Promise.The Promise result will be saved on the variable if you use the 'return'keyword.|❌|
|for each| Create a loop that executes the proceeding commands for each item in a given collection.|❌|
|if| Create a conditional branch in your test. Terminate the branch with the end command.|❌|
|mouse down| Simulates a user pressing the left mouse button (without releasing it yet).|❌|
|mouse down at| Simulates a user pressing the left mouse button (without releasing it yet) at the specified location.|✅|
|mouse move at| Simulates a user pressing the mouse button (without releasing it yet) on the specified element.|✅|
|mouse out| Simulates a user moving the mouse pointer away from the specified element.|❌|
|mouse over| Simulates a user hovering a mouse over the specified element.|❌|
|mouse up| Simulates the event that occurs when the user releases the mouse button (e.g. stops holding the button down).|❌|
|mouse up at| Simulates the event that occurs when the user releases the mouse button (e.g. stops holding the button down) at the specified location.|✅|
|open| Opens a URL and waits for the page to load before proceeding. This accepts both relative and absolute URLs.|✅|
|pause| 'Wait for the specified amount of time.'|❌|
|remove selection| Remove a selection from the set of selected options in a multi-select element using an option locator.|❌|
|repeat if| Terminate a 'do' control flow branch conditionally. If the result of the provided conditional expression is true it startsthe do loop over.  Otherwise it ends the loop.|❌|
|run| 'Runs a test case from the current project.'|❌|
|run script| Creates a new "script" tag in the body of the current test window and adds the specified text into the body of the command.Beware that JS exceptions thrown in these script tags aren't managedby Selenium so you should probably wrap your script in try/catch blocksif there is any chance that the script will throw an exception.|❌|
|select| Select an element from a drop-down menu using an option locator. Option locators provide different ways of specifying a selectelement (e.g. label= value= id= index=). If no option locator prefixis provided a match on the label will be attempted.|✅|
|select frame| Selects a frame within the current window. You may invoke |❌|
|select window| Selects a popup window using a window locator. Once a popup window has been selected all commands will go to that window.Window locators use handles to select windows.|❌|
|send keys| Simulates keystroke events on the specified element as though you typed the value key-by-key. This simulates a real user typingevery character in the specified string; it is also bound by thelimitations of a real user like not being able to type into a invisibleor read only elements.  This is useful for dynamic UI widgets (likeauto-completing combo boxes) that require explicit key events. Unlikethe simple "type" command which forces the specified value into thepage directly this command will not replace the existing content.|✅|
|set speed| Set execution speed (e.g. set the millisecond length of a delay which will follow each Selenium operation). By default thereis no such delay e.g. the delay is 0 milliseconds. This setting isglobal and will affect all test runs until changed.|❌|
|set window size|"Set the browser's window size including the browser's interface."|✅|
|store| 'Save a target string as a variable for easy re-use.'|❌|
|store attribute| Gets the value of an element attribute. The value of the attribute may differ across browsers (this is the case for the "style"attribute for example).|❌|
|store element count| Gets the number of nodes that match the specified locator (e.g. "xpath=//table" would give the number of tables).|❌|
|store json| Ssave JSON as an object on a variable|❌|
|store text| Gets the text of an element and stores it for later use. This works for any element that contains text.|❌|
|store title| 'Gets the title of the current page.'|❌|
|store value| Gets the value of element and stores it for later use. This works for any input type element.|❌|
|store window handle| 'Gets the handle of the current page.'|❌|
|times| Create a loop that executes the proceeding commands n number of times.|❌|
|type| Sets the value of an input field as though you typed it in. Can also be used to set the value of combo boxes check boxes etc.In these cases value should be the value of the option selected not|✅|
|uncheck| 'Uncheck a toggle-button (checkbox/radio).'|❌|
|verify| Soft assert that a variable is an expected value. The variable's value will be converted to a string for comparison.The test will continue even if the verify fails.|❌|
|verify checked| Soft assert that a toggle-button (checkbox/radio) has been checked.The test will continue even if the verify fails.|❌|
|verify editable| Soft assert whether the specified input element is editable (e.g. hasn't been disabled). The test will continue even if the verify fails.|❌|
|verify element present| Soft assert that the specified element is somewhere on the page.The test will continue even if the verify fails.|❌|
|verify element not present| Soft assert that the specified element is not somewhere on the page.The test will continue even if the verify fails.|❌|
|verify not checked| Soft assert that a toggle-button (checkbox/radio) has not been checked.The test will continue even if the verify fails.|❌|
|verify not editable| Soft assert whether the specified input element is not editable (e.g. hasn't been disabled). The test will continue even if the verify fails.|❌|
|verify not selected value| Soft assert that the expected element has not been chosen in a select menu by its option attribute. The test will continue even if the verify fails.|❌|
|verify not text|'Soft assert the text of an element is not present. The test will continue even if the verify fails.'|❌|
|verify selected label| Soft assert the visible text for a selected option in the specified select element. The test will continue even if the verify fails.|❌|
|verify selected value| Soft assert that the expected element has been chosen in a select menu by its option attribute. The test will continue even if the verify fails.|❌|
|verify text|'Soft assert the text of an element is present. The test will continue even if the verify fails.'|❌|
|verify title|'Soft assert the title of the current page contains the provided text. The test will continue even if the verify fails.'|❌|
|verify value| Soft assert the (whitespace-trimmed) value of an input field (or anything else with a value parameter). For checkbox/radioelements the value will be "on" or "off" depending on whether theelement is checked or not. The test will continue even if the verify fails.|❌|
|wait for element editable| 'Wait for an element to be editable.'|❌|
|wait for element not editable| 'Wait for an element to not be editable.'|❌|
|wait for element not present| 'Wait for a target element to not be present on the page.'|❌|
|wait for element not visible| 'Wait for a target element to not be visible on the page.'|❌|
|wait for element present| 'Wait for a target element to be present on the page.'|❌|
|wait for element visible| 'Wait for a target element to be visible on the page.'|❌|
|while| Create a loop that executes the proceeding commands repeatedly for as long as the provided conditional expression is true.|❌|
