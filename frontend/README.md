# Macrofit
At Macrofit, we don't believe in documentation. This README is used to track bugs that are too small to warrant immediate troubleshooting.

### Bug List

1. Opening Add food causes the icons loaded from fontawesome to blink. Convert these into SVGs and the problem will go away.

2. This is really fucking annoying me, but the current solution for closing the result content is incredibly fucking jank. I have a random ass block 5000 pixels tall extending down the screen to be clicked on. It's so fucking stupid and hardcoded but it works for now. I just worry it's going to cause some insufferable bugs sometime down the road. Fix this if you ever get the chance.


### Refactoring Backlog

1. Right now, a lot of the frontend app's types are in shared/types. The frontend should have its types, the backend should have its types, and there should be a set of data transfer functions to go back and forth between them. The solution right now is too messy and very confusing.



# Comments on Data Terminology

# Macros
I wanted to make the nutrients / metrics people can track as flexible as possible, so I'm not putting
any constraints on what people can track. They'll be able to set custom values on their foods, ranging
from calories to dollars to "blahbitybloop", whatever that means to them. While these metrics won't be supported formost foods, users might still find the customization / specification useful, and it can help fill in gaps if there is some metric I haven't thought of. So, "NutritionalMetrics" are basically just the macros and micros, with their associated unit. We're not going to support custom units for now
(who the fuck measures their caloric intake in Joules?)

### Food
Each food is essentially just an id, a name, an image (eventually), and an associated set of macronutrients. It's all the data you might need for searching up a food. It will also belong to a particular "kitchen", such as safeway or the Clark Kerr Dining Hall.

### Kitchen
A kitchen is basically a set of foods that are available from a specific location. For something like
the CKC dining hall, the foods that are "active" will change frequently (at every meal, actually),
but the actual foods that belong to the menu are never deleted.

### FoodServing
A foodserving is basically a food along with a portion size, which is composed of a quantity and a unit.
It will also have a "logged" attribute that tracks how much has been eaten, vs how much still remains to
be eaten.

### Meal
A meal, is a name, a time, an optional mealPlan, and a set of foodServings. It will also have a set of
macro goals

### MealPlan
A Meal Plan is essentially a meal, but instead of haivng foodServings, it will contain references to 
foodPlanServings.


### FoodPlanServings
A FoodPlanServing is a FoodServing along with "minimum" and "maximum" values for the amount of a food
that can be contained in a meal plan. It still has an actual value. When foods are moved from a mealPlan to a meal log, we just drop the minimum and maximum values.