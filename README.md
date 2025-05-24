May 24
The user needs to have a way to edit how each meal is distributed. For instance, they may want to eat 20% of their calories during breakfast, 30% during lunch, and 50% at dinner. In the AddFoodModal, the macro preferences ought to reflect the macro preferences for the meal. So if the user wants to eat 1800 to 2000 calories total, and wants to eat 20% of their nutrients at breakfast, this would correspond to a range of 360 to 400 calories during the meal.

The users should be able to edit their meal distribution preferences in the Preferences page through some intuitive UI component, perhaps through some interactive pie chart or line chart.


May 23
------

Currently, the user's meal preferences are hardcoded in the useUser hook. Instead of this, the "meal preferences", the daily meals each user wants to eat, and their macro goals for that particular meal, should be tracked and stored in the database. The user should be able to edit these preferences from the preferences page. Meals with no foodServings should only appear on the home screen if they exist in the user's meal preferences, and meals that do not exist in the user's meal preferneces, and have no associated foodServings should not be displayed, and should be deleted from the database.


May 16
------

Finals are over. Got a bit cooked. But now we're back onto macrofit. I fixed the registration bug and added the customizable macro preferences feature. Now, I must add the ability for users to give meal preferences. Unfortunately, this is a bit more of an intricate task than I had originally realized, since it's going to require me to add a mechanism for tracking meals in the database.

Every user will have an associated set of meals. These meals will all have associated datetimes, which will be used for filtering and displaying the meals. Ultimately, users should be able to create custom meals. But for now, I'm just going to have the default breakfast, lunch and dinner.

In the useUser hook, I will have a mechanism for loading meals, similar to the way preferences are loaded. 

1. Upon loading, I will check if the dates of the cached meals are for the correct day (in that user's timezone). If they are, then the cached values can be relied upon. Otherwise, move on to database retrieval

2. The meals "breakfast", "lunch", and "dinner" are all retrieved from the database for that day. Meals have a unique time, and a unique name/date pair. If any of the meals are missing, then create a new empty meal in the database

3. Set the cached values to the retrieved or newly generated meals, pushing update notifications where required.

The meal will only ever be updated in two cases
1. The user logs a food
2. The user deletes a food

These events need to also update the database in the places they currently update the local storage.


Finally, it is important to note that the rendering of meals CANNOT be dependent on the user's meal preferences, once that is implemented. For instance, if a user decides they no longer have breakfast in their meal template, they should still be able to see the breakfasts they ate in the past.


Consideration
-------------
Sould the app header's preferences always correspond to the user's stated preferences? What if they make a meal plan that deviates from their stated preferences? Should that override the defaults?

I think it should. Adaptability of logging is a core to Macrofit's mission. Especially for an athlete, the number of calories / carbs / protein consumed might vary drastically between active days and inactive days. When the user goes to construct a meal plan, they should be able to adjust the macro distribution for each meal, as well as the overall targets. These values should default to the user's preferences, since a lot of the time, people will just do the same meal plan every day. But, you can quickly edit the range for each macro. Then, the color-coded feedback you receive on the app header and in the meal planning sections will be based on the meal plan you have set out for that day (or the default preferences if you haven't planned your meals.)


But then what if a user makes a plan for just a single meal? The user's "defaul preferences" will have defaults for each meal. The preferences for the whole day are just given by the sum of the preferences for each meal, default or custom, depending on whether a user has actually made a plan.




May 10
------

Over the next few days, I am going to need to take a break from developing MacroFit, since I have some finals I should probably study for. However, when I return, I intend to hit the ground running. There are a few things I would like to address as soon as possible.

1. Registration bug: Very urgent, some Iphone users are unable to sign up. It seems like Clerk signup is failing. I Need to work with people to understand what is going wrong so that people are actually able to use the app.

2. More flexible macros: Users need to be able to add and delete macronutrients from their preferences for better specificity. This should be relatively simple to implement. Perhaps not a high-priority feature though.

3. Meal preferences: Users should be able to choose the number of meals they want to eat each day their preferred macros for each meal. Ultimately, people should be able to edit the distributions of individual macros, perhaps in the same place they specify the preferences. For now, it will make more sense to just assume an even distribution of macros in all meals. 

4. Meal Planning: It is about time I should implement the meal planning feature. Users should be able to construct a meal plan by selecting the foods they want to eat for a meal, then fine tuning the food quantities through the slider interface.

5. Plan to Log transition: This is a feature that is very central to Macrofit's vision. I believe that a seamless transition from a meal someone has planned to a log of what they actually eat is not currently addressed by any other app. When a user creates a meal plan, the foods should appear in their log, but highlighted as a different color, and not counting towards their macro tally. When they click on these foods, they will have the option to add a serving amount, and see a list of their prior servings. This way, they can tally up what they are eating as they eat.

I would say these features constitute roughly a week's worth of work, and should be finished by the time I start at Acelot.


May 8
-----

Yesterday I got started with the all menus section, but need to integrate the nutritionix api. Then, integrate the meal preferences as previously stated.


May 7
-----

Yesterday, I integrated the ability to filter down to specific menus. Today, I will write the logic for the "all" tab, allowing users to retrieve not only data from the menus, but also nutritional data for common, and some branded foods.

Then, I will update the preferences page to 
1. Allow users to add and delete macronutrient preferences.
2. Customize their meals and what percentage of their caloric they would like to eat for each meal.

The add food modal will then reflect these preferences for each meal. Meals will now be stored in the database, and have associated dates.


May 6
-----
Yesterday, I overhauled the scripts responsible for scraping the cal dining menus so that the foods can be loaded into the database. Now, I must integrate the concept of "kitchens" into the database, so that users can more easily browse and search for foods. 

Each food already corresponds to a kitchen. It must now have an attribute that marks whether it is active in the menu. The menu seeding script for the cal dining hall will need to be updated to choose the active meal based on the time of day. More likely, we'll do a manual input for now.

When a user searches for a food, there is currently a menu selection option that doesn't actually do anything. By the end of today, these menu tabs are going to filter foods down to their active menus. Any food can still be accessed from the "all" tab. Every single food will be returned if there is no search query, allowing users to scroll through and browse the foods. 