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