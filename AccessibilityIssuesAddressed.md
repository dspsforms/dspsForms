# Accessibility Issues Addressed and/or Learned

**Dialog Modal**

For the content of the dialog box, if the data is not formatted, VoiceOver reads it fine. However, if it's formatted, then by default, it's not read aloud. 

Adding a tabIndex="0" or tabIndex="-1" causes VO to read it, but for some unknown reason, it repeats it a second time.

However, if a role="dialog" is added, as recommended in w3c.org, the dialog 
content is read correctly, and only once.

    <some-tag tabindex="-1" role="dialog" >

**Radio Buttons - Multiple Button Groups and Angular**

Let's say you have something like the following. We are leaving the labels out
for clarity.

    <div class="form-control">
        <input type="radio" formControlName="foo" value="yes">
        <input type="radio" formControlName="foo" value="no">
    </div>

    <div class="form-control">
        <input type="radio" formControlName="bar" value="yes">
        <input type="radio" formControlName="bar" value="no">
    </div>

    <div class="form-control">
        <input type="radio" formControlName="fubar" value="yes">
        <input type="radio" formControlName="fubar" value="no">
    </div>

In this case, VO + Chrome doesn't understand that foo has two choices. It says
foo has six choices. 

Also, tabbing on radio buttons lands on the first radio button and skips the rest. 

So, when tabbing forward, you will land on "foo", but you will not be able to tab to "bar" or "fubar." And if tabbing backward, you will land on "fubar" and skip "bar" and "foo."

Solution: for radio buttons, in Angular, add name="foo" name="bar" and name="fubar"

The name attribute is not typically necessary in Angular forms. formControlName handles that. But you need the name attribute for tabbing to work. 

**Testing with Safari**

Make sure to enable the following:

     Preferences | Advanced | Press tab to highlight each item...

Also check the following to inspect elements
     Preferences | Advanced | Show develop menu in menu bar 


In general, Chrome seems to be more in tune with the latest A11y standards.


