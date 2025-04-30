# Macrofit
At Macrofit, we don't believe in documentation. This README is used to track bugs that are too small to warrant immediate troubleshooting.

### Bug List
1. Add food modal extends to top of page, preventing scrolling / interacting with the header. Fix should just involve reducing the height, adding margin or something. 

Update: Actually, this is going to be an issue with any modal. Need to make sure that the header has a z-index that puts it in front of all modal detectors.

2. Opening Add food causes the icons loaded from fontawesome to blink. Convert these into SVGs and the problem will go away.