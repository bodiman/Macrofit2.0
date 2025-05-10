--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Homebrew)
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Food; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public."Food" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    kitchen_id text NOT NULL,
    active boolean NOT NULL,
    updated timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    serving_size double precision NOT NULL
);


ALTER TABLE public."Food" OWNER TO bodi;

--
-- Name: FoodMacro; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public."FoodMacro" (
    id integer NOT NULL,
    food_id text NOT NULL,
    metric_id text NOT NULL,
    value double precision NOT NULL
);


ALTER TABLE public."FoodMacro" OWNER TO bodi;

--
-- Name: FoodMacro_id_seq; Type: SEQUENCE; Schema: public; Owner: bodi
--

CREATE SEQUENCE public."FoodMacro_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FoodMacro_id_seq" OWNER TO bodi;

--
-- Name: FoodMacro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bodi
--

ALTER SEQUENCE public."FoodMacro_id_seq" OWNED BY public."FoodMacro".id;


--
-- Name: Kitchen; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public."Kitchen" (
    id text NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Kitchen" OWNER TO bodi;

--
-- Name: NutritionalMetric; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public."NutritionalMetric" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    unit text NOT NULL
);


ALTER TABLE public."NutritionalMetric" OWNER TO bodi;

--
-- Name: User; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public."User" (
    user_id integer NOT NULL,
    name text,
    email text NOT NULL
);


ALTER TABLE public."User" OWNER TO bodi;

--
-- Name: UserPreference; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public."UserPreference" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    metric_id text NOT NULL,
    min_value double precision,
    max_value double precision
);


ALTER TABLE public."UserPreference" OWNER TO bodi;

--
-- Name: UserPreference_id_seq; Type: SEQUENCE; Schema: public; Owner: bodi
--

CREATE SEQUENCE public."UserPreference_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserPreference_id_seq" OWNER TO bodi;

--
-- Name: UserPreference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bodi
--

ALTER SEQUENCE public."UserPreference_id_seq" OWNED BY public."UserPreference".id;


--
-- Name: User_user_id_seq; Type: SEQUENCE; Schema: public; Owner: bodi
--

CREATE SEQUENCE public."User_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_user_id_seq" OWNER TO bodi;

--
-- Name: User_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bodi
--

ALTER SEQUENCE public."User_user_id_seq" OWNED BY public."User".user_id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: bodi
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO bodi;

--
-- Name: FoodMacro id; Type: DEFAULT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."FoodMacro" ALTER COLUMN id SET DEFAULT nextval('public."FoodMacro_id_seq"'::regclass);


--
-- Name: User user_id; Type: DEFAULT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."User" ALTER COLUMN user_id SET DEFAULT nextval('public."User_user_id_seq"'::regclass);


--
-- Name: UserPreference id; Type: DEFAULT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."UserPreference" ALTER COLUMN id SET DEFAULT nextval('public."UserPreference_id_seq"'::regclass);


--
-- Data for Name: Food; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public."Food" (id, name, description, kitchen_id, active, updated, serving_size) FROM stdin;
common-chicken-breast	chicken breast	chicken breast from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:10:33.121	120
common-corn	corn	corn from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:14:01.443	103
common-broccoli	broccoli	broccoli from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:51:12.779	10
common-slider	slider	slider from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:58:38.292	115.87
common-peach	peach	peach from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:58:40.135	175
common-peaches	peaches	peaches from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:58:41.839	175
common-peach-tea	peach tea	peach tea from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:58:43.976	512.67
common-tofu	tofu	tofu from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:02:46.4	91
common-potato	potato	potato from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:06:06.302	173
common-5-layer-dip	5 layer dip	5 layer dip from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:06:13.168	256.53
common-lays-potato-chips	lays potato chips	lays potato chips from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:08:05.563	28
common-bbq-chicken-breast	bbq chicken breast	bbq chicken breast from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:12:10.878	165
common-chili	chili	chili from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:12:13.344	480
common-honey	honey	honey from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:13:01.78	21
common-baked-fish	baked fish	baked fish from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:51:54.349	170
common-tea	tea	tea from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:03:45.309	178
common-bean	bean	bean from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:04:23.456	177
common-beef	beef	beef from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:04:26.53	85
common-red-beets	red beets	red beets from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:04:33.527	50
common-raw-beets	raw beets	raw beets from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:04:36.471	136
common-can-corn	can corn	can corn from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:19:11.194	263.65
common-honeydew	honeydew	honeydew from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:12:35.542	1280
common-canary-honeydew	canary honeydew	canary honeydew from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:12:38.751	1280
common-beet	beet	beet from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:04:28.674	50
common-beets	beets	beets from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:04:29.694	50
common-potato-chip	potato chip	potato chip from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:06:18.352	28
common-peas	peas	peas from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:33:37.095	160
cafe-3-cajun-potato	Cajun Potato	Cajun Potato from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.411	1
cafe-3-garlic-fried-rice	Garlic Fried Rice	Garlic Fried Rice from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.414	1
cafe-3-scrambled-eggs	Scrambled Eggs	Scrambled Eggs from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.398	1
cafe-3-turkey-sausage-link	Turkey Sausage Link	Turkey Sausage Link from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.408	1
cafe-3-chocolate-chip-pancakes	Chocolate Chip Pancakes	Chocolate Chip Pancakes from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.418	1
cafe-3-roasted-vegetables	Roasted Vegetables	Roasted Vegetables from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.42	1
cafe-3-mini-butter-croissant	Mini Butter Croissant	Mini Butter Croissant from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.423	1
cafe-3-mini-apple-coronet-danish	Mini Apple Coronet Danish	Mini Apple Coronet Danish from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.436	1
cafe-3-mini-cinnamon-swirl-danish	Mini Cinnamon Swirl Danish	Mini Cinnamon Swirl Danish from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.438	1
cafe-3-mini-cheese-plait-danish	Mini Cheese Plait Danish	Mini Cheese Plait Danish from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.441	1
cafe-3-mini-maple-pecan-danish	Mini Maple Pecan Danish	Mini Maple Pecan Danish from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.443	1
cafe-3-oatmeal	Oatmeal	Oatmeal from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.445	1
cafe-3-mung-bean-patty	Mung Bean Patty	Mung Bean Patty from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.447	1
cafe-3-vegan-breakfast-sausage-patty	Vegan Breakfast Sausage Patty	Vegan Breakfast Sausage Patty from Cafe 3 (Breakfast)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.449	1
cafe-3-fried-breaded-cod-with-tartar-sauce	Fried Breaded Cod with Tartar Sauce	Fried Breaded Cod with Tartar Sauce from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.451	1
cafe-3-vegan-chicken-tenders	Vegan Chicken Tenders	Vegan Chicken Tenders from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.452	1
cafe-3-regular-fries	Regular Fries	Regular Fries from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.454	1
cafe-3-creamy-coleslaw-salad	Creamy Coleslaw Salad	Creamy Coleslaw Salad from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.457	1
cafe-3-pepperoni-pizza	Pepperoni Pizza	Pepperoni Pizza from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.463	1
cafe-3-pesto-alfredo-sauce	Pesto Alfredo Sauce	Pesto Alfredo Sauce from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.468	1
cafe-3-grilled-paprika-tofu	Grilled Paprika Tofu	Grilled Paprika Tofu from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.473	1
cafe-3-broccoli-cheddar-soup	Broccoli Cheddar Soup	Broccoli Cheddar Soup from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.478	1
cafe-3-chicken-breast	Chicken Breast	Chicken Breast from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.481	1
cafe-3-stir-fried-cabbage	Stir Fried Cabbage	Stir Fried Cabbage from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.483	1
cafe-3-forbidden-rice	Forbidden Rice	Forbidden Rice from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.487	1
cafe-3-savory-lentils	Savory Lentils	Savory Lentils from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.49	1
cafe-3-chicken-fried-steak-with-gravy	Chicken Fried Steak with Gravy	Chicken Fried Steak with Gravy from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.493	1
cafe-3-vegan-chicken-patty-smothered-in-gravy	Vegan Chicken Patty Smothered in Gravy	Vegan Chicken Patty Smothered in Gravy from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.496	1
cafe-3-mashed-yukon-potato	Mashed Yukon Potato	Mashed Yukon Potato from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.497	1
cafe-3-steamed-broccoli-cauliflower-and-carrots	Steamed Broccoli Cauliflower and Carrots	Steamed Broccoli Cauliflower and Carrots from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.501	1
cafe-3-turkey-and-bean-chili	Turkey and Bean Chili	Turkey and Bean Chili from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.503	1
cafe-3-bean-chili	Bean Chili	Bean Chili from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.506	1
cafe-3-cheese-pizza	Cheese Pizza	Cheese Pizza from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.508	1
cafe-3-pepperoni-pizza-with-pepperoncinis	Pepperoni Pizza with Pepperoncinis	Pepperoni Pizza with Pepperoncinis from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.51	1
cafe-3-penne-pasta	Penne Pasta	Penne Pasta from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.512	1
cafe-3-aurora-sauce	Aurora Sauce	Aurora Sauce from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.515	1
cafe-3-cacciatore-sauce	Cacciatore Sauce	Cacciatore Sauce from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.518	1
cafe-3-baked-tofu-piccata	Baked Tofu Piccata	Baked Tofu Piccata from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.521	1
cafe-3-roasted-zucchini-mushroom	Roasted Zucchini Mushroom	Roasted Zucchini Mushroom from Cafe 3 (Lunch)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	t	2025-05-09 19:09:12.522	1
cafe-3-rosemary-chicken	Rosemary Chicken	Rosemary Chicken from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.525	1
cafe-3-black-beans	Black Beans	Black Beans from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.527	1
cafe-3-quinoa	Quinoa	Quinoa from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.53	1
cafe-3-sauteed-corn-pepper-mexicali	Sauteed Corn Pepper Mexicali	Sauteed Corn Pepper Mexicali from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.534	1
cafe-3-vegan-midnight-cookie	Vegan Midnight Cookie	Vegan Midnight Cookie from Cafe 3 (Dinner)	f801d5f6-a5ec-4312-af0d-ff1bf735287d	f	2025-05-09 19:09:12.537	1
clark-kerr-campus-scrambled-eggs	Scrambled Eggs	Scrambled Eggs from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.538	1
clark-kerr-campus-denver-eggs-scramble	Denver Eggs Scramble	Denver Eggs Scramble from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.542	1
clark-kerr-campus-baked-pork-bacon	Baked Pork Bacon	Baked Pork Bacon from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.545	1
clark-kerr-campus-poblano-fries	Poblano Fries	Poblano Fries from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.547	1
clark-kerr-campus-cheesy-shrimp-grits	Cheesy Shrimp Grits	Cheesy Shrimp Grits from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.551	1
clark-kerr-campus-brown-rice	Brown Rice	Brown Rice from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.552	1
clark-kerr-campus-seared-tofu-soyrizo	Seared Tofu Soyrizo	Seared Tofu Soyrizo from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.555	1
clark-kerr-campus-grilled-balsamic-brussels-sprouts	Grilled Balsamic Brussels Sprouts	Grilled Balsamic Brussels Sprouts from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.558	1
clark-kerr-campus-oatmeal	Oatmeal	Oatmeal from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.562	1
clark-kerr-campus-mini-assorted-danish	Mini Assorted Danish	Mini Assorted Danish from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.564	1
clark-kerr-campus-mini-butter-croissant	Mini Butter Croissant	Mini Butter Croissant from Clark Kerr Campus (Breakfast)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.567	1
clark-kerr-campus-steamed-corn-cob	Steamed Corn Cob	Steamed Corn Cob from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.57	1
clark-kerr-campus-roasted-garlic-fries	Roasted Garlic Fries	Roasted Garlic Fries from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.574	1
clark-kerr-campus-romesco-sauce	Romesco Sauce	Romesco Sauce from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.577	1
clark-kerr-campus-roasted-turkey-breast	Roasted Turkey Breast	Roasted Turkey Breast from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.58	1
clark-kerr-campus-baked-tofu-piccata	Baked Tofu Piccata	Baked Tofu Piccata from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.582	1
clark-kerr-campus-steamed-peas-and-carrots	Steamed Peas and Carrots	Steamed Peas and Carrots from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.585	1
clark-kerr-campus-charbroiled-cabbage	Charbroiled Cabbage	Charbroiled Cabbage from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.588	1
clark-kerr-campus-baked-dijon-herb-crusted-salmon	Baked Dijon Herb Crusted Salmon	Baked Dijon Herb Crusted Salmon from Clark Kerr Campus (Dinner)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.646	1
clark-kerr-campus-kosher-spiced-couscous	Kosher Spiced Couscous	Kosher Spiced Couscous from Clark Kerr Campus (Dinner)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.65	1
clark-kerr-campus-roasted-asparagus	Roasted Asparagus	Roasted Asparagus from Clark Kerr Campus (Dinner)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.653	1
clark-kerr-campus-wild-rice-tofu-stuffed-peppers	Wild Rice Tofu Stuffed Peppers	Wild Rice Tofu Stuffed Peppers from Clark Kerr Campus (Dinner)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.656	1
clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	Roasted Asparagus Mushroom Pepper and Zucchini	Roasted Asparagus Mushroom Pepper and Zucchini from Clark Kerr Campus (Dinner)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	f	2025-05-09 19:09:12.659	1
clark-kerr-campus-chicago-hot-dog	Chicago Hot Dog	Chicago Hot Dog from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.662	1
clark-kerr-campus-vegan-chicago-hot-dog	Vegan Chicago Hot Dog	Vegan Chicago Hot Dog from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.663	1
clark-kerr-campus-housemade-potato-chips	Housemade Potato Chips	Housemade Potato Chips from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.665	1
clark-kerr-campus-cheese-pizza	Cheese Pizza	Cheese Pizza from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.667	1
clark-kerr-campus-hawaiian-pizza	Hawaiian Pizza	Hawaiian Pizza from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.668	1
clark-kerr-campus-gluten-free-penne-pasta	Gluten Free Penne Pasta	Gluten Free Penne Pasta from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.672	1
clark-kerr-campus-steamed-broccoli	Steamed Broccoli	Steamed Broccoli from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.673	1
clark-kerr-campus-baguette-with-herb-oil	Baguette with Herb Oil	Baguette with Herb Oil from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.675	1
clark-kerr-campus-marinara-penne-pasta	Marinara Penne Pasta	Marinara Penne Pasta from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.676	1
clark-kerr-campus-turkey-and-bean-chili	Turkey and Bean Chili	Turkey and Bean Chili from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.678	1
clark-kerr-campus-tuscan-mushroom-bean-soup	Tuscan Mushroom Bean Soup	Tuscan Mushroom Bean Soup from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.679	1
clark-kerr-campus-baked-diced-sweet-potato	Baked Diced Sweet Potato	Baked Diced Sweet Potato from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.681	1
clark-kerr-campus-black-beans	Black Beans	Black Beans from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.682	1
clark-kerr-campus-grilled-eggplant	Grilled Eggplant	Grilled Eggplant from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.684	1
clark-kerr-campus-roasted-peppers	Roasted Peppers	Roasted Peppers from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.685	1
clark-kerr-campus-halal-ground-beef	Halal Ground Beef	Halal Ground Beef from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.686	1
clark-kerr-campus-chicken-breast	Chicken Breast	Chicken Breast from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.688	1
foothill-grilled-asparagus	Grilled Asparagus	Grilled Asparagus from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.821	1
foothill-oatmeal	Oatmeal	Oatmeal from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.824	1
clark-kerr-campus-cheese-marinara-ravioli-pasta	Cheese Marinara Ravioli Pasta	Cheese Marinara Ravioli Pasta from Clark Kerr Campus (Lunch)	3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	t	2025-05-09 19:09:12.67	1
crossroads-scrambled-eggs	Scrambled Eggs	Scrambled Eggs from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.69	1
crossroads-chicken-fried-steak-with-gravy	Chicken Fried Steak with Gravy	Chicken Fried Steak with Gravy from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.693	1
crossroads-turkey-sausage-link	Turkey Sausage Link	Turkey Sausage Link from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.696	1
crossroads-fried-tator-tots	Fried Tator Tots	Fried Tator Tots from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.7	1
crossroads-vegan-chicken-patty-smothered-in-gravy	Vegan Chicken Patty Smothered in Gravy	Vegan Chicken Patty Smothered in Gravy from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.702	1
crossroads-sauteed-green-beans-with-garlic-and-ginger	Sauteed Green Beans with Garlic and Ginger	Sauteed Green Beans with Garlic and Ginger from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.706	1
crossroads-cinnamon-pancakes	Cinnamon Pancakes	Cinnamon Pancakes from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.713	1
crossroads-oatmeal	Oatmeal	Oatmeal from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.717	1
crossroads-cream-of-wheat	Cream of Wheat	Cream of Wheat from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.72	1
crossroads-brown-rice	Brown Rice	Brown Rice from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.726	1
crossroads-mini-apple-coronet-danish	Mini Apple Coronet Danish	Mini Apple Coronet Danish from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.729	1
crossroads-mini-cinnamon-swirl-danish	Mini Cinnamon Swirl Danish	Mini Cinnamon Swirl Danish from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.733	1
crossroads-mini-cheese-plait-danish	Mini Cheese Plait Danish	Mini Cheese Plait Danish from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.735	1
crossroads-mini-maple-pecan-danish	Mini Maple Pecan Danish	Mini Maple Pecan Danish from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.738	1
crossroads-mini-butter-croissant	Mini Butter Croissant	Mini Butter Croissant from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.741	1
crossroads-waffles	Waffles	Waffles from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.744	1
crossroads-pork-pozole	Pork Pozole	Pork Pozole from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.747	1
crossroads-vegan-pozole	Vegan Pozole	Vegan Pozole from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.75	1
crossroads-roasted-oregano-corn	Roasted Oregano Corn	Roasted Oregano Corn from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.754	1
crossroads-tomatillo-avocado-verde-salad	Tomatillo Avocado Verde Salad	Tomatillo Avocado Verde Salad from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.756	1
crossroads-roasted-tomato-salsa	Roasted Tomato Salsa	Roasted Tomato Salsa from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.759	1
crossroads-housemade-corn-tortilla-chips	Housemade Corn Tortilla Chips	Housemade Corn Tortilla Chips from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.761	1
crossroads-sweet-chili-roasted-brussels-sprouts	Sweet Chili Roasted Brussels Sprouts	Sweet Chili Roasted Brussels Sprouts from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.774	1
crossroads-vegetable-eggroll	Vegetable Eggroll	Vegetable Eggroll from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.805	1
crossroads-roasted-pork	Roasted Pork	Roasted Pork from Crossroads (Dinner)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.791	1
crossroads-sauteed-potato-tofu-masala	Sauteed Potato Tofu Masala	Sauteed Potato Tofu Masala from Crossroads (Dinner)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.793	1
crossroads-kosher-spiced-couscous	Kosher Spiced Couscous	Kosher Spiced Couscous from Crossroads (Dinner)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.795	1
crossroads-italian-vegetable-blend	Italian Vegetable Blend	Italian Vegetable Blend from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.796	1
crossroads-steamed-mint-peas	Steamed Mint Peas	Steamed Mint Peas from Crossroads (Dinner)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.798	1
crossroads-cheese-pizza	Cheese Pizza	Cheese Pizza from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.799	1
crossroads-bbq-chicken-pizza	BBQ Chicken Pizza	BBQ Chicken Pizza from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.8	1
crossroads-thai-bbq-chicken	Thai BBQ Chicken	Thai BBQ Chicken from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.801	1
crossroads-sauteed-green-beans	Sauteed Green Beans	Sauteed Green Beans from Crossroads (Dinner)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.803	1
crossroads-jasmine-rice	Jasmine Rice	Jasmine Rice from Crossroads (Breakfast)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	f	2025-05-09 19:09:12.804	1
crossroads-chicken-tikka-masala-soup	Chicken Tikka Masala Soup	Chicken Tikka Masala Soup from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.807	1
crossroads-bean-chili	Bean Chili	Bean Chili from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.808	1
crossroads-halal-ground-beef	Halal Ground Beef	Halal Ground Beef from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.809	1
crossroads-braised-mung-bean	Braised Mung Bean	Braised Mung Bean from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.81	1
crossroads-stir-fried-cabbage	Stir Fried Cabbage	Stir Fried Cabbage from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.811	1
crossroads-forbidden-rice	Forbidden Rice	Forbidden Rice from Crossroads (Lunch)	d2c73808-6ea8-4fbd-8e5b-0b31c938d264	t	2025-05-09 19:09:12.812	1
foothill-scrambled-eggs	Scrambled Eggs	Scrambled Eggs from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.813	1
foothill-denver-eggs-scramble	Denver Eggs Scramble	Denver Eggs Scramble from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.815	1
foothill-bread-pudding	Bread Pudding	Bread Pudding from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.818	1
foothill-basmati-rice	Basmati Rice	Basmati Rice from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.827	1
foothill-mini-assorted-danish	Mini Assorted Danish	Mini Assorted Danish from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.829	1
foothill-brown-rice	Brown Rice	Brown Rice from Foothill (Breakfast)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.83	1
foothill-red-red---black-eyed-peas-stew	Red Red - Black Eyed Peas Stew	Red Red - Black Eyed Peas Stew from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.831	1
foothill-steamed-broccoli	Steamed Broccoli	Steamed Broccoli from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.833	1
foothill-roasted-carrot-zucchini-eggplant-and-onion	Roasted Carrot Zucchini Eggplant and Onion	Roasted Carrot Zucchini Eggplant and Onion from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.835	1
foothill-north-african-style-roasted-chicken	North African-style Roasted Chicken	North African-style Roasted Chicken from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.836	1
foothill-turkey-melt-sandwich	Turkey Melt Sandwich	Turkey Melt Sandwich from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.838	1
foothill-vegan-italian-sausage-sandwich	Vegan Italian Sausage Sandwich	Vegan Italian Sausage Sandwich from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.839	1
foothill-regular-fries	Regular Fries	Regular Fries from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.841	1
foothill-sauteed-green-beans	Sauteed Green Beans	Sauteed Green Beans from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.843	1
foothill-beef-fajitas	Beef Fajitas	Beef Fajitas from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.844	1
foothill-jasmine-rice	Jasmine Rice	Jasmine Rice from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.856	1
foothill-vegan-baked-tofu-bulgogi	Vegan Baked Tofu Bulgogi	Vegan Baked Tofu Bulgogi from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.858	1
foothill-sesame-spinach-banchan	Sesame Spinach Banchan	Sesame Spinach Banchan from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.859	1
foothill-bean-sprout-banchan	Bean Sprout Banchan	Bean Sprout Banchan from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.861	1
foothill-beef-bulgogi	Beef Bulgogi	Beef Bulgogi from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.863	1
foothill-farfalle-pasta	Farfalle Pasta	Farfalle Pasta from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.864	1
foothill-gluten-free-penne-pasta	Gluten Free Penne Pasta	Gluten Free Penne Pasta from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.866	1
foothill-marinara-sauce	Marinara Sauce	Marinara Sauce from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.867	1
foothill-creamy-pesto	Creamy Pesto	Creamy Pesto from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.869	1
foothill-italian-vegetable-blend	Italian Vegetable Blend	Italian Vegetable Blend from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.871	1
foothill-halal-ground-beef	Halal Ground Beef	Halal Ground Beef from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.873	1
foothill-braised-mung-bean	Braised Mung Bean	Braised Mung Bean from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.874	1
foothill-stir-fried-cabbage	Stir Fried Cabbage	Stir Fried Cabbage from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.875	1
foothill-forbidden-rice	Forbidden Rice	Forbidden Rice from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.876	1
foothill-pickling-brine	Pickling Brine	Pickling Brine from Foothill (Dinner)	89c6db5c-9d46-416c-bac0-ba20d10a569d	f	2025-05-09 19:09:12.877	1
foothill-turkey-and-bean-chili	Turkey and Bean Chili	Turkey and Bean Chili from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.879	1
foothill-tuscan-mushroom-bean-soup	Tuscan Mushroom Bean Soup	Tuscan Mushroom Bean Soup from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.879	1
foothill-vegan-lemon-sugar-cookie	Vegan Lemon Sugar Cookie	Vegan Lemon Sugar Cookie from Foothill (Lunch)	89c6db5c-9d46-416c-bac0-ba20d10a569d	t	2025-05-09 19:09:12.88	1
common-creamed-peas	creamed peas	creamed peas from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:46:26.237	245.65
common-sweet-potato	sweet potato	sweet potato from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:52:25.666	114
common-sliced-ham	sliced ham	sliced ham from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:58:29.46	42
common-dried-peaches	dried peaches	dried peaches from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 19:58:34.144	160
common-potato-chips	potato chips	potato chips from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:05:43.276	28
common-lays	lays	lays from Common Foods	523a95fd-c56b-4327-bbd4-94b5373d9eba	f	2025-05-09 20:06:08.949	28
\.


--
-- Data for Name: FoodMacro; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public."FoodMacro" (id, food_id, metric_id, value) FROM stdin;
33426	common-chicken-breast	polyunsaturated_fat	0.0077
33427	common-chicken-breast	monounsaturated_fat	0.0124
33428	common-chicken-breast	22:5_n-3	0.0001
33429	common-chicken-breast	22:1	0
33430	common-chicken-breast	20:5_n-3	0.0001
33431	common-chicken-breast	20:01	0.0003
33432	common-chicken-breast	18:04	0
33433	common-chicken-breast	16:1	0.0015
33434	common-chicken-breast	22:6_n-3	0.0002
33435	common-chicken-breast	20:4	0.0006
33436	common-chicken-breast	18:3	0.0003
33437	common-chicken-breast	18:2	0.0059
33438	common-chicken-breast	18:1	0.0104
33439	common-chicken-breast	18:00	0.0025
33440	common-chicken-breast	16:00	0.0069
33441	common-chicken-breast	14:00	0.0003
33442	common-chicken-breast	12:00	0.0001
33443	common-chicken-breast	10:00	0
33444	common-chicken-breast	8:00	0
33445	common-chicken-breast	6:00	0
33446	common-chicken-breast	4:00	0
33447	common-chicken-breast	saturated_fat	0.0101
33448	common-chicken-breast	cholesterol	0.85
33449	common-chicken-breast	serine	0.01067
33450	common-chicken-breast	proline	0.01275
33451	common-chicken-breast	glycine	0.01524
33452	common-chicken-breast	glutamic_acid	0.04645
33453	common-chicken-breast	aspartic_acid	0.02764
33454	common-chicken-breast	alanine	0.01692
33455	common-chicken-breast	histidine	0.00963
33456	common-chicken-breast	arginine	0.01871
33457	common-chicken-breast	valine	0.01539
33458	common-chicken-breast	tyrosine	0.01047
33459	common-chicken-breast	phenylalanine	0.01231
33460	common-chicken-breast	cystine	0.00397
33461	common-chicken-breast	methionine	0.008589999999999999
33462	common-chicken-breast	lysine	0.02635
33463	common-chicken-breast	leucine	0.02328
33464	common-chicken-breast	isoleucine	0.01638
33465	common-chicken-breast	threonine	0.0131
33466	common-chicken-breast	tryptophan	0.00362
33467	common-chicken-breast	betaine	0.06200000000000001
33468	common-chicken-breast	folate_dfe	0.04
33469	common-chicken-breast	folate_food	0.04
33470	common-chicken-breast	folic_acid	0
33471	common-chicken-breast	vitamin_k	0.003
33472	common-chicken-breast	dihydrophylloquinone	0
33473	common-chicken-breast	choline	0.853
33474	common-chicken-breast	vitamin_b12	0.0034
33475	common-chicken-breast	folate	0.04
33476	common-chicken-breast	vitamin_b6	0.006
33477	common-chicken-breast	pantothenic_acid	0.009649999999999999
33478	common-chicken-breast	niacin	0.13712
33479	common-chicken-breast	riboflavin	0.00114
33480	common-chicken-breast	thiamin	0.0007
33481	common-chicken-breast	vitamin_c	0
33482	common-chicken-breast	lutein_zeaxanthin	0
33483	common-chicken-breast	lycopene	0
33484	common-chicken-breast	cryptoxanthin	0
33485	common-chicken-breast	vitamin_d	0.001
33486	common-chicken-breast	vitamin_d3	0.001
33487	common-chicken-breast	vitamin_d_iu	0.05
33488	common-chicken-breast	vitamin_e_alpha-tocopherol	0.0027
33489	common-chicken-breast	carotene_alpha	0
33490	common-chicken-breast	carotene_beta	0
33491	common-chicken-breast	vitamin_a	0.06
33492	common-chicken-breast	retinol	0.06
33493	common-chicken-breast	vitamin_a_iu	0.21
33494	common-chicken-breast	selenium	0.276
33495	common-chicken-breast	manganese	0.00017
33496	common-chicken-breast	copper	0.00049
33497	common-chicken-breast	zinc	0.01
33498	common-chicken-breast	sodium	0.74
33499	common-chicken-breast	potassium	2.56
33500	common-chicken-breast	phosphorus	2.28
33501	common-chicken-breast	magnesium	0.29
33502	common-chicken-breast	iron	0.0104
33503	common-chicken-breast	calcium	0.15
33504	common-chicken-breast	fiber	0
33505	common-chicken-breast	sugar	0
33506	common-chicken-breast	joules	6.9
33507	common-chicken-breast	theobromine	0
33508	common-chicken-breast	caffeine	0
33509	common-chicken-breast	water	0.6526
33510	common-chicken-breast	alcohol	0
33511	common-chicken-breast	calories	1.65
33512	common-chicken-breast	ash	0.0106
33513	common-chicken-breast	carbohydrates	0
33514	common-chicken-breast	fat	0.0357
33515	common-chicken-breast	protein	0.3102
35264	common-tofu	15:01	0.0003604395604395605
35265	common-tofu	13:00	0
35266	common-tofu	20:3	0
35267	common-tofu	17:01	0.0001802197802197802
35268	common-tofu	20:2_n-6_c	0
35269	common-tofu	24:00:00	0
35270	common-tofu	17:00	9.010989010989012e-05
35271	common-tofu	15:00	0
35272	common-tofu	polyunsaturated_fat	0.02657032967032967
35273	common-tofu	monounsaturated_fat	0.01318021978021978
35274	common-tofu	22:5_n-3	0
35275	common-tofu	22:1	0
35276	common-tofu	20:5_n-3	0
35277	common-tofu	20:01	0.0001802197802197802
35278	common-tofu	18:04	0
35279	common-tofu	16:1	0
35280	common-tofu	14:01	0
35281	common-tofu	22:00	0
35282	common-tofu	22:6_n-3	0
35283	common-tofu	20:4	0
35284	common-tofu	18:3	0.00260989010989011
35285	common-tofu	18:2	0.02386043956043956
33516	common-bbq-chicken-breast	22:04	0
33517	common-bbq-chicken-breast	20:3_n-6	0
33518	common-bbq-chicken-breast	20:3_n-3	0
33519	common-bbq-chicken-breast	18:3_n-3_c	7.454545454545455e-05
33520	common-bbq-chicken-breast	15:01	0
33521	common-bbq-chicken-breast	trans_polyenoic_fat	0
33522	common-bbq-chicken-breast	trans_monoenoic_fat	0
33523	common-bbq-chicken-breast	20:3	0
33524	common-bbq-chicken-breast	17:01	0
33525	common-bbq-chicken-breast	18:3_n-6_c	0
33526	common-bbq-chicken-breast	22:1_c	8.121212121212121e-05
33527	common-bbq-chicken-breast	18:2_n-6_c	0.000283030303030303
33528	common-bbq-chicken-breast	18:1_c	0.0001593939393939394
33529	common-bbq-chicken-breast	16:1_c	0
33530	common-bbq-chicken-breast	20:2_n-6_c	3.636363636363636e-06
33531	common-bbq-chicken-breast	24:1_c	3.636363636363636e-06
33532	common-bbq-chicken-breast	18:2_CLAs	0
33533	common-bbq-chicken-breast	22:1_t	0
33534	common-bbq-chicken-breast	18:1_t	0
33535	common-bbq-chicken-breast	16:1_t	0
33536	common-bbq-chicken-breast	24:00:00	3.636363636363636e-06
33537	common-bbq-chicken-breast	17:00	1.090909090909091e-05
33538	common-bbq-chicken-breast	15:00	3.636363636363636e-06
33539	common-bbq-chicken-breast	polyunsaturated_fat	0.005334545454545455
33540	common-bbq-chicken-breast	monounsaturated_fat	0.008305454545454546
33541	common-bbq-chicken-breast	22:5_n-3	6.484848484848485e-05
33542	common-bbq-chicken-breast	22:1	8.121212121212121e-05
33543	common-bbq-chicken-breast	20:5_n-3	6.484848484848485e-05
33544	common-bbq-chicken-breast	20:01	0.0002363636363636364
33545	common-bbq-chicken-breast	18:04	0
33546	common-bbq-chicken-breast	16:1	0.0009696969696969697
33547	common-bbq-chicken-breast	14:01	0
33548	common-bbq-chicken-breast	22:00	3.636363636363636e-06
33549	common-bbq-chicken-breast	22:6_n-3	0.0001290909090909091
33550	common-bbq-chicken-breast	20:4	0.0003878787878787879
33551	common-bbq-chicken-breast	18:3	0.0002684848484848485
33552	common-bbq-chicken-breast	18:2	0.004096363636363636
33553	common-bbq-chicken-breast	18:1	0.006881818181818182
33554	common-bbq-chicken-breast	20:00	7.272727272727272e-06
33555	common-bbq-chicken-breast	18:00	0.001644242424242424
33556	common-bbq-chicken-breast	16:00	0.004548484848484849
33557	common-bbq-chicken-breast	14:00	0.0002012121212121212
33558	common-bbq-chicken-breast	12:00	6.484848484848485e-05
33559	common-bbq-chicken-breast	10:00	0
33560	common-bbq-chicken-breast	8:00	0
33561	common-bbq-chicken-breast	6:00	0
33562	common-bbq-chicken-breast	4:00	7.272727272727272e-06
33563	common-bbq-chicken-breast	saturated_fat	0.006687878787878788
33564	common-bbq-chicken-breast	trans_fat	0
33565	common-bbq-chicken-breast	cholesterol	0.549429696969697
33566	common-bbq-chicken-breast	serine	0.006896969696969697
33567	common-bbq-chicken-breast	proline	0.008241212121212121
33568	common-bbq-chicken-breast	glycine	0.00985090909090909
33569	common-bbq-chicken-breast	glutamic_acid	0.03002484848484849
33570	common-bbq-chicken-breast	aspartic_acid	0.01786606060606061
33571	common-bbq-chicken-breast	alanine	0.0109369696969697
33572	common-bbq-chicken-breast	histidine	0.006224848484848484
33573	common-bbq-chicken-breast	arginine	0.01209393939393939
33574	common-bbq-chicken-breast	valine	0.009947878787878789
33575	common-bbq-chicken-breast	tyrosine	0.006767878787878788
33576	common-bbq-chicken-breast	phenylalanine	0.007956969696969697
33577	common-bbq-chicken-breast	cystine	0.002566060606060606
33578	common-bbq-chicken-breast	methionine	0.005552727272727273
33579	common-bbq-chicken-breast	lysine	0.01703212121212121
33580	common-bbq-chicken-breast	leucine	0.01504787878787879
33581	common-bbq-chicken-breast	isoleucine	0.01058787878787879
33582	common-bbq-chicken-breast	threonine	0.008467878787878788
33583	common-bbq-chicken-breast	tryptophan	0.00234
33584	common-bbq-chicken-breast	betaine	0.04149030303030303
33585	common-bbq-chicken-breast	folate_dfe	0.03292787878787878
33586	common-bbq-chicken-breast	folate_food	0.03292787878787878
33587	common-bbq-chicken-breast	folic_acid	0
33588	common-bbq-chicken-breast	vitamin_k	0.008304242424242424
33589	common-bbq-chicken-breast	dihydrophylloquinone	0
33590	common-bbq-chicken-breast	choline	0.5764751515151515
33591	common-bbq-chicken-breast	vitamin_b12	0.002197575757575758
33592	common-bbq-chicken-breast	folate	0.03292787878787878
33593	common-bbq-chicken-breast	vitamin_b6	0.004143636363636363
33594	common-bbq-chicken-breast	pantothenic_acid	0.006817575757575758
33595	common-bbq-chicken-breast	niacin	0.09074363636363636
33596	common-bbq-chicken-breast	riboflavin	0.0009351515151515151
33597	common-bbq-chicken-breast	thiamin	0.0005339393939393939
33598	common-bbq-chicken-breast	vitamin_c	0.002121818181818182
33599	common-bbq-chicken-breast	tocotrienol_delta	0
33600	common-bbq-chicken-breast	tocotrienol_gamma	0
33601	common-bbq-chicken-breast	tocotrienol_beta	0
33602	common-bbq-chicken-breast	tocotrienol_alpha	0.00046
33603	common-bbq-chicken-breast	tocopherol_delta	7.09090909090909e-05
33604	common-bbq-chicken-breast	tocopherol_gamma	0.0006721212121212121
33605	common-bbq-chicken-breast	tocopherol_beta	0.0001060606060606061
33606	common-bbq-chicken-breast	lutein_zeaxanthin	0.3111787878787878
33607	common-bbq-chicken-breast	lycopene	16.08935393939394
33608	common-bbq-chicken-breast	cryptoxanthin	0.007072121212121213
33609	common-bbq-chicken-breast	vitamin_d	0.0006466666666666667
33610	common-bbq-chicken-breast	vitamin_d3	0.0006466666666666667
33611	common-bbq-chicken-breast	vitamin_d_iu	0.03231939393939394
33612	common-bbq-chicken-breast	vitamin_e_alpha-tocopherol	0.004573939393939394
33613	common-bbq-chicken-breast	carotene_alpha	0
33614	common-bbq-chicken-breast	carotene_beta	0.4703042424242424
33615	common-bbq-chicken-breast	vitamin_a	0.07768060606060606
33616	common-bbq-chicken-breast	retinol	0.03878303030303031
33617	common-bbq-chicken-breast	vitamin_a_iu	0.9278327272727273
33618	common-bbq-chicken-breast	selenium	0.183
33619	common-bbq-chicken-breast	manganese	0.0005557575757575758
33620	common-bbq-chicken-breast	copper	0.0005715151515151515
33621	common-bbq-chicken-breast	zinc	0.007064848484848485
33622	common-bbq-chicken-breast	sodium	4.109924242424243
33623	common-bbq-chicken-breast	potassium	2.475133333333333
33624	common-bbq-chicken-breast	phosphorus	1.544486666666667
33625	common-bbq-chicken-breast	magnesium	0.2334218181818182
33626	common-bbq-chicken-breast	iron	0.008985454545454545
33627	common-bbq-chicken-breast	calcium	0.213650303030303
33628	common-bbq-chicken-breast	fiber	0.003182424242424243
33629	common-bbq-chicken-breast	galactose	0
33630	common-bbq-chicken-breast	sugar	0.1175406060606061
33631	common-bbq-chicken-breast	joules	7.006083636363636
33632	common-bbq-chicken-breast	theobromine	0
33633	common-bbq-chicken-breast	caffeine	0
33634	common-bbq-chicken-breast	water	0.6152939393939394
33635	common-bbq-chicken-breast	alcohol	0
33636	common-bbq-chicken-breast	maltose	0
33637	common-bbq-chicken-breast	lactose	0
33638	common-bbq-chicken-breast	fructose	0.05010666666666667
33639	common-bbq-chicken-breast	glucose	0.0579569696969697
33640	common-bbq-chicken-breast	sucrose	0.009476969696969697
33641	common-bbq-chicken-breast	starch	0.001237575757575757
33642	common-bbq-chicken-breast	calories	1.674752727272727
33643	common-bbq-chicken-breast	ash	0.01770787878787879
33644	common-bbq-chicken-breast	carbohydrates	0.1441678787878788
33645	common-bbq-chicken-breast	fat	0.02530363636363636
33646	common-bbq-chicken-breast	protein	0.2034090909090909
33647	common-chili	20:3	7e-05
33648	common-chili	17:01	0.0006600000000000001
33649	common-chili	24:00:00	6e-05
33650	common-chili	17:00	0.00075
33651	common-chili	15:00	0.0003
33652	common-chili	polyunsaturated_fat	0.00501
33653	common-chili	monounsaturated_fat	0.02469
33654	common-chili	22:5_n-3	7.999999999999999e-05
33655	common-chili	22:1	4e-05
33656	common-chili	20:5_n-3	2e-05
33657	common-chili	20:01	0.00047
33658	common-chili	18:04	0
33659	common-chili	16:1	0.00241
33660	common-chili	14:01	0.00054
33661	common-chili	22:00	7.999999999999999e-05
33662	common-chili	22:6_n-3	9.999999999999999e-06
33663	common-chili	20:4	0.00024
33664	common-chili	18:3	0.00052
33665	common-chili	18:2	0.004079999999999999
33666	common-chili	18:1	0.02057
33667	common-chili	20:00	0.00011
33668	common-chili	18:00	0.00687
33669	common-chili	16:00	0.0126
33670	common-chili	14:00	0.00164
33671	common-chili	12:00	0.00015
33672	common-chili	10:00	0
33673	common-chili	8:00	0
33674	common-chili	6:00	0
33675	common-chili	4:00	0
33676	common-chili	saturated_fat	0.02255
33677	common-chili	cholesterol	0.21
33678	common-chili	serine	0.00332
33679	common-chili	proline	0.00457
33680	common-chili	glycine	0.00625
33681	common-chili	glutamic_acid	0.0124
33682	common-chili	aspartic_acid	0.00636
33683	common-chili	alanine	0.00522
33684	common-chili	histidine	0.00168
33685	common-chili	arginine	0.00406
33686	common-chili	valine	0.00378
33687	common-chili	tyrosine	0.00188
33688	common-chili	phenylalanine	0.00284
33689	common-chili	methionine	0.00103
33690	common-chili	lysine	0.00393
33691	common-chili	leucine	0.005589999999999999
33692	common-chili	isoleucine	0.00298
33693	common-chili	threonine	0.00309
33694	common-chili	folate_dfe	0.08
33695	common-chili	folate_food	0.08
33696	common-chili	folic_acid	0
33697	common-chili	vitamin_k	0.022
33698	common-chili	choline	0.422
33699	common-chili	vitamin_b12	0.0102
33700	common-chili	folate	0.08
33701	common-chili	vitamin_b6	0.00129
33702	common-chili	pantothenic_acid	0.00157
33703	common-chili	niacin	0.01245
33704	common-chili	riboflavin	0.00111
33705	common-chili	thiamin	0.00031
33706	common-chili	vitamin_c	0.018
33707	common-chili	lutein_zeaxanthin	0.16
33708	common-chili	lycopene	2.48
33709	common-chili	cryptoxanthin	0.3
33710	common-chili	vitamin_d	0.001
33711	common-chili	vitamin_d_iu	0.03
33712	common-chili	vitamin_e_alpha-tocopherol	0.0059
33713	common-chili	carotene_alpha	0.19
33714	common-chili	carotene_beta	1.38
33715	common-chili	vitamin_a	0.14
33716	common-chili	retinol	0
33717	common-chili	vitamin_a_iu	2.71
33718	common-chili	selenium	0.065
33719	common-chili	manganese	0.00276
33720	common-chili	copper	0.00188
33721	common-chili	zinc	0.0112
33722	common-chili	sodium	4.11
33723	common-chili	potassium	1.85
33724	common-chili	phosphorus	0.77
33725	common-chili	magnesium	0.2
33726	common-chili	iron	0.0201
33727	common-chili	calcium	0.3
33728	common-chili	fiber	0.005
33729	common-chili	sugar	0.011
33730	common-chili	joules	4.95
33731	common-chili	theobromine	0
33732	common-chili	caffeine	0
33733	common-chili	water	0.7767999999999999
33734	common-chili	alcohol	0
33735	common-chili	fructose	0.0042
33736	common-chili	sucrose	0.0068
33737	common-chili	starch	0.0335
33738	common-chili	calories	1.18
33739	common-chili	ash	0.0159
33740	common-chili	carbohydrates	0.06100000000000001
33741	common-chili	fat	0.071
33742	common-chili	protein	0.07529999999999999
33949	common-honey	polyunsaturated_fat	0
33950	common-honey	monounsaturated_fat	0
33951	common-honey	22:5_n-3	0
33952	common-honey	22:1	0
33953	common-honey	20:5_n-3	0
33954	common-honey	20:01	0
33955	common-honey	18:04	0
33956	common-honey	16:1	0
33957	common-honey	22:6_n-3	0
33958	common-honey	20:4	0
33959	common-honey	18:3	0
33960	common-honey	18:2	0
33961	common-honey	18:1	0
33962	common-honey	18:00	0
33963	common-honey	16:00	0
33964	common-honey	14:00	0
33965	common-honey	12:00	0
33966	common-honey	10:00	0
33967	common-honey	8:00	0
33968	common-honey	6:00	0
33969	common-honey	4:00	0
33970	common-honey	saturated_fat	0
33971	common-honey	cholesterol	0
33972	common-honey	serine	6.19047619047619e-05
33973	common-honey	proline	0.0009
33974	common-honey	glycine	7.142857142857143e-05
33975	common-honey	glutamic_acid	0.000180952380952381
33976	common-honey	aspartic_acid	0.0002714285714285714
33977	common-honey	alanine	6.19047619047619e-05
33978	common-honey	histidine	9.523809523809525e-06
33979	common-honey	arginine	5.238095238095238e-05
33980	common-honey	valine	9.047619047619048e-05
33981	common-honey	tyrosine	8.095238095238095e-05
33982	common-honey	phenylalanine	0.0001095238095238095
33983	common-honey	cystine	2.857142857142857e-05
33984	common-honey	methionine	9.523809523809525e-06
33985	common-honey	lysine	8.095238095238095e-05
33986	common-honey	leucine	9.999999999999999e-05
33987	common-honey	isoleucine	8.095238095238095e-05
33988	common-honey	threonine	3.80952380952381e-05
33989	common-honey	tryptophan	3.80952380952381e-05
33990	common-honey	betaine	0.017
33991	common-honey	folate_dfe	0.02
33992	common-honey	folate_food	0.02
33993	common-honey	folic_acid	0
33994	common-honey	vitamin_k	0
33995	common-honey	choline	0.022
33996	common-honey	vitamin_b12	0
33997	common-honey	folate	0.02
33998	common-honey	vitamin_b6	0.0002380952380952381
33999	common-honey	pantothenic_acid	0.0006809523809523809
34000	common-honey	niacin	0.001209523809523809
34001	common-honey	riboflavin	0.000380952380952381
34002	common-honey	thiamin	0
34003	common-honey	vitamin_c	0.005
34004	common-honey	lutein_zeaxanthin	0
34005	common-honey	lycopene	0
34006	common-honey	cryptoxanthin	0
34007	common-honey	vitamin_d	0
34008	common-honey	vitamin_d_iu	0
34009	common-honey	vitamin_e_alpha-tocopherol	0
34010	common-honey	carotene_alpha	0
34011	common-honey	carotene_beta	0
34012	common-honey	vitamin_a	0
34013	common-honey	retinol	0
34014	common-honey	vitamin_a_iu	0
34015	common-honey	selenium	0.008
34016	common-honey	manganese	0.0007999999999999999
34017	common-honey	fluoride	0.06999999999999999
34018	common-honey	copper	0.0003619047619047619
34019	common-honey	zinc	0.0022
34020	common-honey	sodium	0.04
34021	common-honey	potassium	0.52
34022	common-honey	phosphorus	0.04
34023	common-honey	magnesium	0.02
34024	common-honey	iron	0.0042
34025	common-honey	calcium	0.06
34026	common-honey	fiber	0.002
34027	common-honey	galactose	0.031
34028	common-honey	sugar	0.8212
34029	common-honey	joules	12.72
34030	common-honey	theobromine	0
34031	common-honey	caffeine	0
34032	common-honey	water	0.171
34033	common-honey	alcohol	0
34034	common-honey	maltose	0.0144
34035	common-honey	fructose	0.4094
34036	common-honey	glucose	0.3575
34037	common-honey	sucrose	0.0089
34038	common-honey	calories	3.04
34039	common-honey	ash	0.002
34040	common-honey	carbohydrates	0.824
34041	common-honey	fat	0
34042	common-honey	protein	0.003
35286	common-tofu	18:1	0.01246043956043956
35287	common-tofu	20:00	0
35288	common-tofu	18:00	0.0027
35289	common-tofu	16:00	0.00630989010989011
35290	common-tofu	14:00	9.010989010989012e-05
35291	common-tofu	12:00	0
35292	common-tofu	10:00	0
35293	common-tofu	8:00	0
35294	common-tofu	6:00	0
35295	common-tofu	4:00	0
35296	common-tofu	saturated_fat	0.00919010989010989
35297	common-tofu	trans_fat	0
35298	common-tofu	cholesterol	0
35299	common-tofu	serine	0.00586043956043956
35300	common-tofu	proline	0.006260439560439561
35301	common-tofu	glycine	0.00422967032967033
35302	common-tofu	glutamic_acid	0.01899010989010989
35303	common-tofu	aspartic_acid	0.01176043956043956
35304	common-tofu	alanine	0.004470329670329671
35305	common-tofu	histidine	0.00249010989010989
35306	common-tofu	arginine	0.007899999999999999
35307	common-tofu	valine	0.005029670329670329
35308	common-tofu	tyrosine	0.004050549450549451
35309	common-tofu	phenylalanine	0.004819780219780219
35310	common-tofu	cystine	0.0003296703296703297
35311	common-tofu	methionine	0.00121978021978022
33743	common-honeydew	polyunsaturated_fat	0.00059
33744	common-honeydew	monounsaturated_fat	3e-05
33745	common-honeydew	22:5_n-3	0
33746	common-honeydew	22:1	0
33747	common-honeydew	20:5_n-3	0
33748	common-honeydew	20:01	0
33749	common-honeydew	18:04	0
33750	common-honeydew	16:1	0
33751	common-honeydew	22:6_n-3	0
33752	common-honeydew	20:4	0
33753	common-honeydew	18:3	0.00033
33754	common-honeydew	18:2	0.00026
33755	common-honeydew	18:1	3e-05
33756	common-honeydew	18:00	3e-05
33757	common-honeydew	16:00	0.00032
33758	common-honeydew	14:00	2e-05
33759	common-honeydew	12:00	2e-05
33760	common-honeydew	10:00	0
33761	common-honeydew	8:00	0
33762	common-honeydew	6:00	0
33763	common-honeydew	4:00	0
33764	common-honeydew	saturated_fat	0.00038
33765	common-honeydew	trans_fat	0
33766	common-honeydew	cholesterol	0
33767	common-honeydew	serine	0.00023
33768	common-honeydew	proline	0.00012
33769	common-honeydew	glycine	0.00016
33770	common-honeydew	glutamic_acid	0.00153
33771	common-honeydew	aspartic_acid	0.00088
33772	common-honeydew	alanine	0.00044
33773	common-honeydew	histidine	5e-05
33774	common-honeydew	arginine	0.00014
33775	common-honeydew	valine	0.00018
33776	common-honeydew	tyrosine	0.0001
33777	common-honeydew	phenylalanine	0.00015
33778	common-honeydew	cystine	5e-05
33779	common-honeydew	methionine	5e-05
33780	common-honeydew	lysine	0.00018
33781	common-honeydew	leucine	0.00016
33782	common-honeydew	isoleucine	0.00013
33783	common-honeydew	threonine	0.00013
33784	common-honeydew	tryptophan	5e-05
33785	common-honeydew	folate_dfe	0.19
33786	common-honeydew	folate_food	0.19
33787	common-honeydew	folic_acid	0
33788	common-honeydew	vitamin_k	0.029
33789	common-honeydew	dihydrophylloquinone	0
33790	common-honeydew	choline	0.076
33791	common-honeydew	vitamin_b12	0
33792	common-honeydew	folate	0.19
33793	common-honeydew	vitamin_b6	0.00088
33794	common-honeydew	pantothenic_acid	0.00155
33795	common-honeydew	niacin	0.00418
33796	common-honeydew	riboflavin	0.00012
33797	common-honeydew	thiamin	0.00038
33798	common-honeydew	vitamin_c	0.18
33799	common-honeydew	tocotrienol_delta	0
33800	common-honeydew	tocotrienol_gamma	0
33801	common-honeydew	tocotrienol_beta	0
33802	common-honeydew	tocotrienol_alpha	0
33803	common-honeydew	tocopherol_delta	0
33804	common-honeydew	tocopherol_gamma	0.0003
33805	common-honeydew	tocopherol_beta	0
33806	common-honeydew	lutein_zeaxanthin	0.27
33807	common-honeydew	lycopene	0
33808	common-honeydew	cryptoxanthin	0
33809	common-honeydew	vitamin_d	0
33810	common-honeydew	vitamin_d_iu	0
33811	common-honeydew	vitamin_e_alpha-tocopherol	0.0002
33812	common-honeydew	carotene_alpha	0
33813	common-honeydew	carotene_beta	0.3
33814	common-honeydew	vitamin_a	0.03
33815	common-honeydew	retinol	0
33816	common-honeydew	vitamin_a_iu	0.5
33817	common-honeydew	selenium	0.007000000000000001
33818	common-honeydew	manganese	0.00027
33819	common-honeydew	copper	0.00024
33820	common-honeydew	zinc	0.0009
33821	common-honeydew	sodium	0.18
33822	common-honeydew	potassium	2.28
33823	common-honeydew	phosphorus	0.11
33824	common-honeydew	magnesium	0.1
33825	common-honeydew	iron	0.0017
33826	common-honeydew	calcium	0.06
33827	common-honeydew	fiber	0.008
33828	common-honeydew	galactose	0
33829	common-honeydew	sugar	0.08120000000000001
33830	common-honeydew	joules	1.5
33831	common-honeydew	theobromine	0
33832	common-honeydew	caffeine	0
33833	common-honeydew	water	0.8981999999999999
33834	common-honeydew	alcohol	0
33835	common-honeydew	maltose	0
33836	common-honeydew	lactose	0
33837	common-honeydew	fructose	0.0296
33838	common-honeydew	glucose	0.0268
33839	common-honeydew	sucrose	0.0248
33840	common-honeydew	starch	0
33841	common-honeydew	calories	0.36
33842	common-honeydew	ash	0.0041
33843	common-honeydew	carbohydrates	0.09090000000000001
33844	common-honeydew	fat	0.0014
33845	common-honeydew	protein	0.0054
33846	common-canary-honeydew	polyunsaturated_fat	0.00059
33847	common-canary-honeydew	monounsaturated_fat	3e-05
33848	common-canary-honeydew	22:5_n-3	0
33849	common-canary-honeydew	22:1	0
33850	common-canary-honeydew	20:5_n-3	0
33851	common-canary-honeydew	20:01	0
33852	common-canary-honeydew	18:04	0
33853	common-canary-honeydew	16:1	0
33854	common-canary-honeydew	22:6_n-3	0
33855	common-canary-honeydew	20:4	0
33856	common-canary-honeydew	18:3	0.00033
33857	common-canary-honeydew	18:2	0.00026
33858	common-canary-honeydew	18:1	3e-05
33859	common-canary-honeydew	18:00	3e-05
33860	common-canary-honeydew	16:00	0.00032
33861	common-canary-honeydew	14:00	2e-05
33862	common-canary-honeydew	12:00	2e-05
33863	common-canary-honeydew	10:00	0
33864	common-canary-honeydew	8:00	0
33865	common-canary-honeydew	6:00	0
33866	common-canary-honeydew	4:00	0
33867	common-canary-honeydew	saturated_fat	0.00038
33868	common-canary-honeydew	trans_fat	0
33869	common-canary-honeydew	cholesterol	0
33870	common-canary-honeydew	serine	0.00023
33871	common-canary-honeydew	proline	0.00012
33872	common-canary-honeydew	glycine	0.00016
33873	common-canary-honeydew	glutamic_acid	0.00153
33874	common-canary-honeydew	aspartic_acid	0.00088
33875	common-canary-honeydew	alanine	0.00044
33876	common-canary-honeydew	histidine	5e-05
33877	common-canary-honeydew	arginine	0.00014
33878	common-canary-honeydew	valine	0.00018
33879	common-canary-honeydew	tyrosine	0.0001
33880	common-canary-honeydew	phenylalanine	0.00015
33881	common-canary-honeydew	cystine	5e-05
33882	common-canary-honeydew	methionine	5e-05
33883	common-canary-honeydew	lysine	0.00018
33884	common-canary-honeydew	leucine	0.00016
33885	common-canary-honeydew	isoleucine	0.00013
33886	common-canary-honeydew	threonine	0.00013
33887	common-canary-honeydew	tryptophan	5e-05
33888	common-canary-honeydew	folate_dfe	0.19
33889	common-canary-honeydew	folate_food	0.19
33890	common-canary-honeydew	folic_acid	0
33891	common-canary-honeydew	vitamin_k	0.029
33892	common-canary-honeydew	dihydrophylloquinone	0
33893	common-canary-honeydew	choline	0.076
33894	common-canary-honeydew	vitamin_b12	0
33895	common-canary-honeydew	folate	0.19
33896	common-canary-honeydew	vitamin_b6	0.00088
33897	common-canary-honeydew	pantothenic_acid	0.00155
33898	common-canary-honeydew	niacin	0.00418
33899	common-canary-honeydew	riboflavin	0.00012
33900	common-canary-honeydew	thiamin	0.00038
33901	common-canary-honeydew	vitamin_c	0.18
33902	common-canary-honeydew	tocotrienol_delta	0
33903	common-canary-honeydew	tocotrienol_gamma	0
33904	common-canary-honeydew	tocotrienol_beta	0
33905	common-canary-honeydew	tocotrienol_alpha	0
33906	common-canary-honeydew	tocopherol_delta	0
33907	common-canary-honeydew	tocopherol_gamma	0.0003
33908	common-canary-honeydew	tocopherol_beta	0
33909	common-canary-honeydew	lutein_zeaxanthin	0.27
33910	common-canary-honeydew	lycopene	0
33911	common-canary-honeydew	cryptoxanthin	0
33912	common-canary-honeydew	vitamin_d	0
33913	common-canary-honeydew	vitamin_d_iu	0
33914	common-canary-honeydew	vitamin_e_alpha-tocopherol	0.0002
33915	common-canary-honeydew	carotene_alpha	0
33916	common-canary-honeydew	carotene_beta	0.3
33917	common-canary-honeydew	vitamin_a	0.03
33918	common-canary-honeydew	retinol	0
33919	common-canary-honeydew	vitamin_a_iu	0.5
33920	common-canary-honeydew	selenium	0.007000000000000001
33921	common-canary-honeydew	manganese	0.00027
33922	common-canary-honeydew	copper	0.00024
33923	common-canary-honeydew	zinc	0.0009
33924	common-canary-honeydew	sodium	0.18
33925	common-canary-honeydew	potassium	2.28
33926	common-canary-honeydew	phosphorus	0.11
33927	common-canary-honeydew	magnesium	0.1
33928	common-canary-honeydew	iron	0.0017
33929	common-canary-honeydew	calcium	0.06
33930	common-canary-honeydew	fiber	0.008
33931	common-canary-honeydew	galactose	0
33932	common-canary-honeydew	sugar	0.08120000000000001
33933	common-canary-honeydew	joules	1.5
33934	common-canary-honeydew	theobromine	0
33935	common-canary-honeydew	caffeine	0
33936	common-canary-honeydew	water	0.8981999999999999
33937	common-canary-honeydew	alcohol	0
33938	common-canary-honeydew	maltose	0
33939	common-canary-honeydew	lactose	0
33940	common-canary-honeydew	fructose	0.0296
33941	common-canary-honeydew	glucose	0.0268
33942	common-canary-honeydew	sucrose	0.0248
33943	common-canary-honeydew	starch	0
33944	common-canary-honeydew	calories	0.36
33945	common-canary-honeydew	ash	0.0041
33946	common-canary-honeydew	carbohydrates	0.09090000000000001
33947	common-canary-honeydew	fat	0.0014
33948	common-canary-honeydew	protein	0.0054
35312	common-tofu	lysine	0.0051
35313	common-tofu	leucine	0.00803956043956044
35314	common-tofu	isoleucine	0.0049
35315	common-tofu	threonine	0.00452967032967033
35316	common-tofu	tryptophan	0.001350549450549451
35317	common-tofu	folate_dfe	0.09
35318	common-tofu	folate_food	0.09
35319	common-tofu	folic_acid	0
35320	common-tofu	vitamin_k	0.028
35321	common-tofu	choline	0.33
35322	common-tofu	vitamin_b12	0
35323	common-tofu	folate	0.09
35324	common-tofu	vitamin_b6	0.0008296703296703297
35325	common-tofu	pantothenic_acid	0.00843956043956044
35326	common-tofu	niacin	0.00240989010989011
35327	common-tofu	riboflavin	0.0004802197802197803
35328	common-tofu	thiamin	0.0004802197802197803
35329	common-tofu	vitamin_c	0
34043	common-corn	polyunsaturated_fat	0.006030097087378641
34044	common-corn	monounsaturated_fat	0.003739805825242718
34045	common-corn	22:5_n-3	0
34046	common-corn	22:1	0
34047	common-corn	20:5_n-3	0
34048	common-corn	20:01	0
34049	common-corn	18:04	0
34050	common-corn	16:1	0
34051	common-corn	22:6_n-3	0
34052	common-corn	20:4	0
34053	common-corn	18:3	0.0001796116504854369
34054	common-corn	18:2	0.005860194174757282
34055	common-corn	18:1	0.003739805825242718
34056	common-corn	18:00	0.0001203883495145631
34057	common-corn	16:00	0.001850485436893204
34058	common-corn	14:00	0
34059	common-corn	12:00	0
34060	common-corn	10:00	0
34061	common-corn	8:00	0
34062	common-corn	6:00	0
34063	common-corn	4:00	0
34064	common-corn	saturated_fat	0.001969902912621359
34065	common-corn	trans_fat	0
34066	common-corn	cholesterol	0
34067	common-corn	serine	0.001579611650485437
34068	common-corn	proline	0.003009708737864078
34069	common-corn	glycine	0.001309708737864077
34070	common-corn	glutamic_acid	0.006550485436893204
34071	common-corn	aspartic_acid	0.002520388349514563
34072	common-corn	alanine	0.003039805825242718
34073	common-corn	histidine	0.0009097087378640777
34074	common-corn	arginine	0.001350485436893204
34075	common-corn	valine	0.001909708737864078
34076	common-corn	tyrosine	0.001260194174757282
34077	common-corn	phenylalanine	0.001550485436893204
34078	common-corn	cystine	0.0002699029126213592
34079	common-corn	methionine	0.0006902912621359223
34080	common-corn	lysine	0.001409708737864078
34081	common-corn	leucine	0.003579611650485437
34082	common-corn	isoleucine	0.001330097087378641
34083	common-corn	threonine	0.001330097087378641
34084	common-corn	tryptophan	0.0002300970873786408
34085	common-corn	folate_dfe	0.23
34086	common-corn	folate_food	0.23
34087	common-corn	folic_acid	0
34088	common-corn	vitamin_k	0.004
34089	common-corn	choline	0.291
34090	common-corn	vitamin_b12	0
34091	common-corn	folate	0.23
34092	common-corn	vitamin_b6	0.001390291262135922
34093	common-corn	pantothenic_acid	0.007920388349514564
34094	common-corn	niacin	0.01683009708737864
34095	common-corn	riboflavin	0.0005699029126213593
34096	common-corn	thiamin	0.0009300970873786407
34097	common-corn	vitamin_c	0.055
34098	common-corn	tocopherol_delta	0
34099	common-corn	tocopherol_gamma	0.0019
34100	common-corn	tocopherol_beta	0
34101	common-corn	lutein_zeaxanthin	9.059999999999999
34102	common-corn	lycopene	0
34103	common-corn	cryptoxanthin	1.61
34104	common-corn	vitamin_d	0
34105	common-corn	vitamin_d_iu	0
34106	common-corn	vitamin_e_alpha-tocopherol	0.0009000000000000001
34107	common-corn	carotene_alpha	0.23
34108	common-corn	carotene_beta	0.66
34109	common-corn	vitamin_a	0.13
34110	common-corn	retinol	0
34111	common-corn	vitamin_a_iu	2.63
34112	common-corn	selenium	0.002
34113	common-corn	manganese	0.001669902912621359
34114	common-corn	copper	0.0004902912621359224
34115	common-corn	zinc	0.0062
34116	common-corn	sodium	0.01
34117	common-corn	potassium	2.18
34118	common-corn	phosphorus	0.77
34119	common-corn	magnesium	0.26
34120	common-corn	iron	0.004500000000000001
34121	common-corn	calcium	0.03
34122	common-corn	fiber	0.024
34123	common-corn	galactose	0
34124	common-corn	sugar	0.0454
34125	common-corn	joules	4.01
34126	common-corn	theobromine	0
34127	common-corn	caffeine	0
34128	common-corn	water	0.7341000000000001
34129	common-corn	alcohol	0
34130	common-corn	maltose	0.0017
34131	common-corn	lactose	0
34132	common-corn	fructose	0.007899999999999999
34133	common-corn	glucose	0.0084
34134	common-corn	sucrose	0.0274
34135	common-corn	starch	0.0717
34136	common-corn	calories	0.96
34137	common-corn	ash	0.0071
34138	common-corn	carbohydrates	0.2098
34139	common-corn	fat	0.015
34140	common-corn	protein	0.03410000000000001
35330	common-tofu	lutein_zeaxanthin	0
35331	common-tofu	lycopene	0
35332	common-tofu	cryptoxanthin	0
35333	common-tofu	vitamin_d	0
35334	common-tofu	vitamin_d_iu	0
35335	common-tofu	vitamin_e_alpha-tocopherol	0.0001
35336	common-tofu	carotene_alpha	0
35337	common-tofu	carotene_beta	0
35338	common-tofu	vitamin_a	0
35339	common-tofu	retinol	0
35340	common-tofu	vitamin_a_iu	0
35341	common-tofu	selenium	0.13
35342	common-tofu	manganese	0.00666043956043956
35343	common-tofu	copper	0.002
35344	common-tofu	zinc	0.0107
35345	common-tofu	sodium	0.04
35346	common-tofu	potassium	1.3
35347	common-tofu	phosphorus	1.11
35348	common-tofu	magnesium	0.35
35349	common-tofu	iron	0.0204
35350	common-tofu	calcium	2.82
35351	common-tofu	fiber	0.01
35352	common-tofu	sugar	0.0071
35353	common-tofu	joules	3.49
35354	common-tofu	theobromine	0
35355	common-tofu	caffeine	0
35356	common-tofu	water	0.8231
34141	common-creamed-peas	18:3_n-3_c	0.0001457358029717077
34142	common-creamed-peas	trans_polyenoic_fat	0.0001367799715041726
34143	common-creamed-peas	trans_monoenoic_fat	0.001377976796254834
34144	common-creamed-peas	18:2_n-6_c	0.001000610624872786
34145	common-creamed-peas	18:1_c	0.007844494199063709
34146	common-creamed-peas	16:1_c	0.0004441278241400366
34147	common-creamed-peas	18:2_CLAs	0.0001233462243028699
34148	common-creamed-peas	18:1_t	0.001377976796254834
34149	common-creamed-peas	17:00	0.0002589049460614696
34150	common-creamed-peas	polyunsaturated_fat	0.002466517402808874
34151	common-creamed-peas	monounsaturated_fat	0.0120736820679829
34152	common-creamed-peas	beta-sitosterol	0.001848157948300428
34153	common-creamed-peas	campesterol	0
34154	common-creamed-peas	stigmasterol	0
34155	common-creamed-peas	phytosterols	0
34156	common-creamed-peas	22:5_n-3	0
34157	common-creamed-peas	22:1	0
34158	common-creamed-peas	20:5_n-3	0
34159	common-creamed-peas	20:01	4.640749033177285e-05
34160	common-creamed-peas	18:04	0
34161	common-creamed-peas	16:1	0.0006155098717687767
34162	common-creamed-peas	22:6_n-3	0
34163	common-creamed-peas	20:4	0
34164	common-creamed-peas	18:3	0.00038795033584368
34165	common-creamed-peas	18:2	0.002078567066965195
34166	common-creamed-peas	18:1	0.01129696722979849
34167	common-creamed-peas	20:00	6.391207001831873e-05
34168	common-creamed-peas	18:00	0.005577447588031753
34169	common-creamed-peas	16:00	0.01230653368613881
34170	common-creamed-peas	14:00	0.004205577040504783
34171	common-creamed-peas	12:00	0.00141054345613678
34172	common-creamed-peas	10:00	0.001360065133319764
34173	common-creamed-peas	8:00	0.0006338286179523713
34174	common-creamed-peas	6:00	0.001075106859352738
34175	common-creamed-peas	4:00	0.001737838387950336
34176	common-creamed-peas	saturated_fat	0.02879625483411358
34177	common-creamed-peas	trans_fat	0.001514756767759007
34178	common-creamed-peas	cholesterol	0.1312538164054549
34179	common-creamed-peas	serine	0.001802971707714227
34180	common-creamed-peas	proline	0.002546712802768166
34181	common-creamed-peas	glycine	0.001309993893751272
34182	common-creamed-peas	glutamic_acid	0.007549358843883574
34183	common-creamed-peas	aspartic_acid	0.00364787299002646
34184	common-creamed-peas	alanine	0.001764705882352941
34185	common-creamed-peas	histidine	0.0009704864644819865
34186	common-creamed-peas	arginine	0.002743741095053939
34187	common-creamed-peas	valine	0.002223488703439853
34188	common-creamed-peas	tyrosine	0.001331162222674537
34189	common-creamed-peas	phenylalanine	0.001811520455933238
34190	common-creamed-peas	cystine	0.0003435782617545288
34191	common-creamed-peas	methionine	0.0008096885813148789
34192	common-creamed-peas	lysine	0.00276368817423163
34193	common-creamed-peas	leucine	0.00317891308772644
34194	common-creamed-peas	isoleucine	0.001920211683289233
34195	common-creamed-peas	threonine	0.001721147974760839
34196	common-creamed-peas	tryptophan	0.000415631996743334
34197	common-creamed-peas	betaine	0.01854589863627111
34198	common-creamed-peas	folate_dfe	0.4028007327498473
34199	common-creamed-peas	folate_food	0.3361408508039894
34200	common-creamed-peas	folic_acid	0.03918176267046611
34201	common-creamed-peas	vitamin_k	0.1283667820069204
34202	common-creamed-peas	choline	0.1546256869529819
34203	common-creamed-peas	vitamin_b12	0.001594545084469774
34204	common-creamed-peas	folate	0.3753226134744555
34205	common-creamed-peas	vitamin_b6	0.000780785670669652
34206	common-creamed-peas	pantothenic_acid	0.002242621616120496
34207	common-creamed-peas	niacin	0.009592509668227151
34208	common-creamed-peas	riboflavin	0.00135314471809485
34209	common-creamed-peas	thiamin	0.001836352534093222
34210	common-creamed-peas	vitamin_c	0.0555750050885406
34211	common-creamed-peas	tocotrienol_delta	0
34212	common-creamed-peas	tocotrienol_gamma	0
34213	common-creamed-peas	tocotrienol_beta	2.27966619173621e-05
34214	common-creamed-peas	tocotrienol_alpha	5.292082230816202e-06
34215	common-creamed-peas	tocopherol_delta	0.0002137187054752697
34216	common-creamed-peas	tocopherol_gamma	0.01228984327294932
34217	common-creamed-peas	tocopherol_beta	1.791166293507022e-05
34218	common-creamed-peas	lutein_zeaxanthin	12.51017708121311
34219	common-creamed-peas	lycopene	0
34220	common-creamed-peas	cryptoxanthin	0
34221	common-creamed-peas	vitamin_d	0.003989415835538367
34222	common-creamed-peas	vitamin_d3	0
34223	common-creamed-peas	vitamin_d2	0
34224	common-creamed-peas	vitamin_d_iu	0.1595766334215347
34225	common-creamed-peas	vitamin_e_alpha-tocopherol	0.001243639324241807
34226	common-creamed-peas	carotene_alpha	0.1042133116222267
34227	common-creamed-peas	carotene_beta	6.586334215347038
34228	common-creamed-peas	vitamin_a	1.086562181966212
34229	common-creamed-peas	retinol	0.529446366782007
34230	common-creamed-peas	vitamin_a_iu	12.91087522898433
34231	common-creamed-peas	selenium	0.02349888052106656
34232	common-creamed-peas	manganese	0.001640545491553023
34233	common-creamed-peas	fluoride	0.00139263179320171
34234	common-creamed-peas	copper	0.0006175452880113983
34235	common-creamed-peas	zinc	0.005312029309993894
34236	common-creamed-peas	sodium	2.799915733767556
34237	common-creamed-peas	potassium	1.258235294117647
34238	common-creamed-peas	phosphorus	0.838729900264604
34239	common-creamed-peas	magnesium	0.1770576022796662
34240	common-creamed-peas	iron	0.009327498473437819
34241	common-creamed-peas	calcium	0.6518290250356198
34242	common-creamed-peas	fiber	0.02413515163851008
34243	common-creamed-peas	galactose	0
34244	common-creamed-peas	sugar	0.02640911866476695
34245	common-creamed-peas	joules	4.37646081823733
34246	common-creamed-peas	theobromine	0
34247	common-creamed-peas	caffeine	0
34248	common-creamed-peas	water	0.7792277630775494
34249	common-creamed-peas	alcohol	0
34250	common-creamed-peas	maltose	0.0005210665581111337
34251	common-creamed-peas	lactose	0
34252	common-creamed-peas	fructose	0.0006773865255444738
34253	common-creamed-peas	glucose	0.0005731732139222472
34254	common-creamed-peas	sucrose	0.02454101363728883
34255	common-creamed-peas	calories	1.046914716059434
34256	common-creamed-peas	ash	0.01327824140036638
34257	common-creamed-peas	carbohydrates	0.1169664156319968
34258	common-creamed-peas	fat	0.04679177691837981
34259	common-creamed-peas	protein	0.04373905963769591
35357	common-tofu	alcohol	0
35358	common-tofu	calories	0.83
35359	common-tofu	ash	0.0128
35360	common-tofu	carbohydrates	0.0118
35361	common-tofu	fat	0.0526
35362	common-tofu	protein	0.0998
36678	common-lays-potato-chips	cystine	0.0008892857142857142
36679	common-lays-potato-chips	methionine	0.0011
36680	common-lays-potato-chips	lysine	0.004239285714285715
36681	common-lays-potato-chips	leucine	0.004189285714285714
36682	common-lays-potato-chips	isoleucine	0.002828571428571429
36683	common-lays-potato-chips	threonine	0.002528571428571429
36684	common-lays-potato-chips	tryptophan	0.001078571428571429
36685	common-lays-potato-chips	betaine	0.002
36686	common-lays-potato-chips	folate_dfe	0.29
36687	common-lays-potato-chips	folate_food	0.29
36688	common-lays-potato-chips	folic_acid	0
36689	common-lays-potato-chips	vitamin_k	0.221
36690	common-lays-potato-chips	choline	0.121
36691	common-lays-potato-chips	vitamin_b12	0
36692	common-lays-potato-chips	folate	0.29
36693	common-lays-potato-chips	vitamin_b6	0.005310714285714286
36694	common-lays-potato-chips	pantothenic_acid	0.009560714285714285
36695	common-lays-potato-chips	niacin	0.04762142857142857
36696	common-lays-potato-chips	riboflavin	0.0008785714285714285
36697	common-lays-potato-chips	thiamin	0.002128571428571428
36698	common-lays-potato-chips	vitamin_c	0.216
36699	common-lays-potato-chips	tocotrienol_delta	0
36700	common-lays-potato-chips	tocotrienol_gamma	0.0005
36701	common-lays-potato-chips	tocotrienol_beta	0.0001
36702	common-lays-potato-chips	tocotrienol_alpha	0.0009
36703	common-lays-potato-chips	tocopherol_delta	0.0017
36704	common-lays-potato-chips	tocopherol_gamma	0.1083
36705	common-lays-potato-chips	tocopherol_beta	0.0024
36706	common-lays-potato-chips	lutein_zeaxanthin	0
36707	common-lays-potato-chips	lycopene	0
36708	common-lays-potato-chips	cryptoxanthin	0
36709	common-lays-potato-chips	vitamin_d	0
36710	common-lays-potato-chips	vitamin_d_iu	0
36711	common-lays-potato-chips	vitamin_e_alpha-tocopherol	0.1045
36712	common-lays-potato-chips	carotene_alpha	0
36713	common-lays-potato-chips	carotene_beta	0
36714	common-lays-potato-chips	vitamin_a	0
36715	common-lays-potato-chips	retinol	0
36716	common-lays-potato-chips	vitamin_a_iu	0
36717	common-lays-potato-chips	selenium	0.025
36718	common-lays-potato-chips	manganese	0.0043
36719	common-lays-potato-chips	fluoride	0.6130000000000001
36720	common-lays-potato-chips	copper	0.002339285714285714
36721	common-lays-potato-chips	zinc	0.0109
36722	common-lays-potato-chips	sodium	5.27
36723	common-lays-potato-chips	potassium	11.96
36724	common-lays-potato-chips	phosphorus	1.53
36725	common-lays-potato-chips	magnesium	0.63
36726	common-lays-potato-chips	iron	0.0128
36727	common-lays-potato-chips	calcium	0.21
36728	common-lays-potato-chips	fiber	0.031
36729	common-lays-potato-chips	galactose	0
36730	common-lays-potato-chips	sugar	0.0033
36731	common-lays-potato-chips	joules	22.27
36732	common-lays-potato-chips	theobromine	0
36733	common-lays-potato-chips	caffeine	0
36734	common-lays-potato-chips	water	0.0186
36735	common-lays-potato-chips	alcohol	0
36736	common-lays-potato-chips	maltose	0
36737	common-lays-potato-chips	lactose	0
36738	common-lays-potato-chips	fructose	0
36739	common-lays-potato-chips	glucose	0
36740	common-lays-potato-chips	sucrose	0.0033
36741	common-lays-potato-chips	calories	5.32
36742	common-lays-potato-chips	ash	0.0394
36743	common-lays-potato-chips	carbohydrates	0.5383
36744	common-lays-potato-chips	fat	0.3398
36745	common-lays-potato-chips	protein	0.0639
34260	common-broccoli	15:01	0
34261	common-broccoli	20:3	0
34262	common-broccoli	17:01	2e-05
34263	common-broccoli	18:3_n-6_c	0
34264	common-broccoli	20:2_n-6_c	0
34265	common-broccoli	17:00	0
34266	common-broccoli	15:00	0
34267	common-broccoli	polyunsaturated_fat	0.0017
34268	common-broccoli	monounsaturated_fat	0.0004
34269	common-broccoli	22:5_n-3	0
34270	common-broccoli	22:1	0
34271	common-broccoli	20:5_n-3	0
34272	common-broccoli	20:01	0
34273	common-broccoli	18:04	0
34274	common-broccoli	16:1	8.999999999999999e-05
34275	common-broccoli	14:01	0
34276	common-broccoli	22:00	5e-05
34277	common-broccoli	22:6_n-3	0
34278	common-broccoli	20:4	0
34279	common-broccoli	18:3	0.00119
34280	common-broccoli	18:2	0.00051
34281	common-broccoli	18:1	0.00029
34282	common-broccoli	20:00	4e-05
34283	common-broccoli	18:00	0.00013
34284	common-broccoli	16:00	0.00056
34285	common-broccoli	14:00	0
34286	common-broccoli	12:00	2e-05
34287	common-broccoli	10:00	0
34288	common-broccoli	8:00	0
34289	common-broccoli	6:00	0
34290	common-broccoli	4:00	0
34291	common-broccoli	saturated_fat	0.0007900000000000001
34292	common-broccoli	trans_fat	0
34293	common-broccoli	cholesterol	0
34294	common-broccoli	serine	0.00129
34295	common-broccoli	proline	0.00111
34296	common-broccoli	glycine	0.00101
34297	common-broccoli	glutamic_acid	0.00549
34298	common-broccoli	aspartic_acid	0.00329
34299	common-broccoli	alanine	0.00114
34300	common-broccoli	histidine	0.00063
34301	common-broccoli	arginine	0.002
34302	common-broccoli	valine	0.00138
34303	common-broccoli	tyrosine	0.0006000000000000001
34304	common-broccoli	phenylalanine	0.00116
34305	common-broccoli	cystine	0.00031
34306	common-broccoli	methionine	0.00043
34307	common-broccoli	lysine	0.00155
34308	common-broccoli	leucine	0.00147
34309	common-broccoli	isoleucine	0.00092
34310	common-broccoli	threonine	0.0009599999999999999
34311	common-broccoli	tryptophan	0.00034
34312	common-broccoli	betaine	0.001
34313	common-broccoli	folate_dfe	1.08
34314	common-broccoli	folate_food	1.08
34315	common-broccoli	folic_acid	0
34316	common-broccoli	vitamin_k	1.411
34317	common-broccoli	dihydrophylloquinone	0
34318	common-broccoli	choline	0.401
34319	common-broccoli	vitamin_b12	0
34320	common-broccoli	folate	1.08
34321	common-broccoli	vitamin_b6	0.002
34322	common-broccoli	pantothenic_acid	0.006160000000000001
34323	common-broccoli	niacin	0.00553
34324	common-broccoli	riboflavin	0.00123
34325	common-broccoli	thiamin	0.00063
34326	common-broccoli	vitamin_c	0.649
34327	common-broccoli	tocotrienol_delta	0
34328	common-broccoli	tocotrienol_gamma	0
34329	common-broccoli	tocotrienol_beta	0
34330	common-broccoli	tocotrienol_alpha	0
34331	common-broccoli	tocopherol_delta	0
34332	common-broccoli	tocopherol_gamma	0.0025
34333	common-broccoli	tocopherol_beta	0.0001
34334	common-broccoli	lutein_zeaxanthin	10.8
34335	common-broccoli	lycopene	0
34336	common-broccoli	cryptoxanthin	0
34337	common-broccoli	vitamin_d	0
34338	common-broccoli	vitamin_d_iu	0
34339	common-broccoli	vitamin_e_alpha-tocopherol	0.0145
34340	common-broccoli	carotene_alpha	0
34341	common-broccoli	carotene_beta	9.290000000000001
34342	common-broccoli	vitamin_a	0.77
34343	common-broccoli	retinol	0
34344	common-broccoli	vitamin_a_iu	15.48
34345	common-broccoli	selenium	0.016
34346	common-broccoli	manganese	0.00194
34347	common-broccoli	fluoride	0.04
34348	common-broccoli	copper	0.0006100000000000001
34349	common-broccoli	zinc	0.0045
34350	common-broccoli	sodium	0.41
34351	common-broccoli	potassium	2.93
34352	common-broccoli	phosphorus	0.67
34353	common-broccoli	magnesium	0.21
34354	common-broccoli	iron	0.0067
34355	common-broccoli	calcium	0.4
34356	common-broccoli	fiber	0.033
34357	common-broccoli	galactose	0
34358	common-broccoli	sugar	0.0139
34359	common-broccoli	joules	1.46
34360	common-broccoli	theobromine	0
34361	common-broccoli	caffeine	0
34362	common-broccoli	water	0.8925000000000001
34363	common-broccoli	alcohol	0
34364	common-broccoli	maltose	0
34365	common-broccoli	lactose	0
34366	common-broccoli	fructose	0.007399999999999999
34367	common-broccoli	glucose	0.0049
34368	common-broccoli	sucrose	0.0008
34369	common-broccoli	starch	0
34370	common-broccoli	calories	0.35
34371	common-broccoli	ash	0.0077
34372	common-broccoli	carbohydrates	0.0718
34373	common-broccoli	fat	0.0041
34374	common-broccoli	protein	0.0238
35363	common-tea	polyunsaturated_fat	3.988764044943821e-05
35364	common-tea	monounsaturated_fat	1.01123595505618e-05
34375	common-baked-fish	18:3_n-3_c	0.00045
34376	common-baked-fish	15:01	0
34377	common-baked-fish	20:3	0.00025
34378	common-baked-fish	17:01	0
34379	common-baked-fish	20:2_n-6_c	0.00015
34380	common-baked-fish	24:00:00	0
34381	common-baked-fish	17:00	0
34382	common-baked-fish	15:00	5e-05
34383	common-baked-fish	polyunsaturated_fat	0.006
34384	common-baked-fish	monounsaturated_fat	0.00955
34385	common-baked-fish	22:5_n-3	0.0006
34386	common-baked-fish	22:1	0
34387	common-baked-fish	20:5_n-3	5e-05
34388	common-baked-fish	20:01	0.00045
34389	common-baked-fish	18:04	0
34390	common-baked-fish	16:1	0.00145
34391	common-baked-fish	14:01	0
34392	common-baked-fish	22:00	0
34393	common-baked-fish	22:6_n-3	0.0013
34394	common-baked-fish	20:4	0.00035
34395	common-baked-fish	18:3	0.00045
34396	common-baked-fish	18:2	0.00285
34397	common-baked-fish	18:1	0.00765
34398	common-baked-fish	20:00	0
34399	common-baked-fish	18:00	0.0019
34400	common-baked-fish	16:00	0.006600000000000001
34401	common-baked-fish	14:00	0.00085
34402	common-baked-fish	12:00	0
34403	common-baked-fish	10:00	0
34404	common-baked-fish	8:00	0
34405	common-baked-fish	6:00	0
34406	common-baked-fish	4:00	0
34407	common-baked-fish	saturated_fat	0.0094
34408	common-baked-fish	cholesterol	0.5700000000000001
34409	common-baked-fish	serine	0.009609999999999999
34410	common-baked-fish	proline	0.00953
34411	common-baked-fish	glycine	0.0122
34412	common-baked-fish	glutamic_acid	0.0392
34413	common-baked-fish	aspartic_acid	0.0281
34414	common-baked-fish	alanine	0.01491
34415	common-baked-fish	histidine	0.00585
34416	common-baked-fish	arginine	0.0159
34417	common-baked-fish	valine	0.0128
34418	common-baked-fish	tyrosine	0.008700000000000001
34419	common-baked-fish	phenylalanine	0.0105
34420	common-baked-fish	cystine	0.00265
34421	common-baked-fish	methionine	0.00766
34422	common-baked-fish	lysine	0.02315
34423	common-baked-fish	leucine	0.0204
34424	common-baked-fish	isoleucine	0.0122
34425	common-baked-fish	threonine	0.01156
34426	common-baked-fish	tryptophan	0.00265
34427	common-baked-fish	betaine	0.263
34428	common-baked-fish	folate_dfe	0.06
34429	common-baked-fish	folate_food	0.06
34430	common-baked-fish	folic_acid	0
34431	common-baked-fish	vitamin_k	0.009
34432	common-baked-fish	dihydrophylloquinone	0
34433	common-baked-fish	choline	0.513
34434	common-baked-fish	vitamin_b12	0.0186
34435	common-baked-fish	folate	0.06
34436	common-baked-fish	vitamin_b6	0.00123
34437	common-baked-fish	pantothenic_acid	0.00664
34438	common-baked-fish	niacin	0.04745
34439	common-baked-fish	riboflavin	0.00073
34440	common-baked-fish	thiamin	0.0009299999999999999
34441	common-baked-fish	vitamin_c	0
34442	common-baked-fish	tocotrienol_delta	0
34443	common-baked-fish	tocotrienol_gamma	0
34444	common-baked-fish	tocotrienol_beta	0
34445	common-baked-fish	tocotrienol_alpha	0
34446	common-baked-fish	tocopherol_delta	0
34447	common-baked-fish	tocopherol_gamma	0.0006
34448	common-baked-fish	tocopherol_beta	0
34449	common-baked-fish	lutein_zeaxanthin	0
34450	common-baked-fish	lycopene	0
34451	common-baked-fish	cryptoxanthin	0
34452	common-baked-fish	vitamin_d	0.037
34453	common-baked-fish	vitamin_d3	0.037
34454	common-baked-fish	vitamin_d_iu	1.5
34455	common-baked-fish	vitamin_e_alpha-tocopherol	0.007899999999999999
34456	common-baked-fish	carotene_alpha	0
34457	common-baked-fish	carotene_beta	0
34458	common-baked-fish	vitamin_a	0
34459	common-baked-fish	retinol	0
34460	common-baked-fish	vitamin_a_iu	0
34461	common-baked-fish	selenium	0.544
34462	common-baked-fish	manganese	0.00037
34463	common-baked-fish	copper	0.00075
34464	common-baked-fish	zinc	0.004099999999999999
34465	common-baked-fish	sodium	0.56
34466	common-baked-fish	potassium	3.8
34467	common-baked-fish	phosphorus	2.04
34468	common-baked-fish	magnesium	0.34
34469	common-baked-fish	iron	0.0069
34470	common-baked-fish	calcium	0.14
34471	common-baked-fish	fiber	0
34472	common-baked-fish	sugar	0
34473	common-baked-fish	joules	5.38
34474	common-baked-fish	theobromine	0
34475	common-baked-fish	caffeine	0
34476	common-baked-fish	water	0.7159
34477	common-baked-fish	alcohol	0
34478	common-baked-fish	calories	1.28
34479	common-baked-fish	ash	0.0114
34480	common-baked-fish	carbohydrates	0
34481	common-baked-fish	fat	0.0265
34482	common-baked-fish	protein	0.2615
35365	common-tea	16:1	0
35366	common-tea	18:3	2.97752808988764e-05
35367	common-tea	18:2	1.01123595505618e-05
35368	common-tea	18:1	0
35369	common-tea	18:00	0
35370	common-tea	16:00	1.01123595505618e-05
35371	common-tea	saturated_fat	2.02247191011236e-05
34483	common-sweet-potato	15:01	0
34484	common-sweet-potato	20:3	0
34485	common-sweet-potato	17:01	0
34486	common-sweet-potato	20:2_n-6_c	0
34487	common-sweet-potato	24:00:00	0
34488	common-sweet-potato	17:00	0
34489	common-sweet-potato	15:00	0
34490	common-sweet-potato	polyunsaturated_fat	0.0009201754385964911
34491	common-sweet-potato	monounsaturated_fat	2.017543859649123e-05
34492	common-sweet-potato	22:5_n-3	0
34493	common-sweet-potato	22:1	0
34494	common-sweet-potato	20:5_n-3	0
34495	common-sweet-potato	20:01	0
34496	common-sweet-potato	18:04	0
34497	common-sweet-potato	16:1	0
34498	common-sweet-potato	14:01	0
34499	common-sweet-potato	22:00	0
34500	common-sweet-potato	22:6_n-3	0
34501	common-sweet-potato	20:4	0
34502	common-sweet-potato	18:3	5.964912280701754e-05
34503	common-sweet-potato	18:2	0.0009
34504	common-sweet-potato	18:1	2.017543859649123e-05
34505	common-sweet-potato	20:00	0
34506	common-sweet-potato	18:00	2.017543859649123e-05
34507	common-sweet-potato	16:00	0.0005
34508	common-sweet-potato	14:00	0
34509	common-sweet-potato	12:00	0
34510	common-sweet-potato	10:00	0
34511	common-sweet-potato	8:00	0
34512	common-sweet-potato	6:00	0
34513	common-sweet-potato	4:00	0
34514	common-sweet-potato	saturated_fat	0.0005201754385964913
34515	common-sweet-potato	trans_fat	0
34516	common-sweet-potato	cholesterol	0
34517	common-sweet-potato	serine	0.001129824561403509
34518	common-sweet-potato	proline	0.0006701754385964912
34519	common-sweet-potato	glycine	0.0008096491228070174
34520	common-sweet-potato	glutamic_acid	0.001979824561403509
34521	common-sweet-potato	aspartic_acid	0.004879824561403509
34522	common-sweet-potato	alanine	0.0009903508771929824
34523	common-sweet-potato	histidine	0.0003903508771929825
34524	common-sweet-potato	arginine	0.0007
34525	common-sweet-potato	valine	0.0011
34526	common-sweet-potato	tyrosine	0.0004403508771929825
34527	common-sweet-potato	phenylalanine	0.001140350877192983
34528	common-sweet-potato	cystine	0.0002798245614035088
34529	common-sweet-potato	methionine	0.0003701754385964913
34530	common-sweet-potato	lysine	0.0008403508771929824
34531	common-sweet-potato	leucine	0.001179824561403509
34532	common-sweet-potato	isoleucine	0.0007
34533	common-sweet-potato	threonine	0.001070175438596491
34534	common-sweet-potato	tryptophan	0.0004
34535	common-sweet-potato	betaine	0.346
34536	common-sweet-potato	folate_dfe	0.06
34537	common-sweet-potato	folate_food	0.06
34538	common-sweet-potato	folic_acid	0
34539	common-sweet-potato	vitamin_k	0.023
34540	common-sweet-potato	dihydrophylloquinone	0
34541	common-sweet-potato	choline	0.131
34542	common-sweet-potato	vitamin_b12	0
34543	common-sweet-potato	folate	0.06
34544	common-sweet-potato	vitamin_b6	0.002859649122807018
34545	common-sweet-potato	pantothenic_acid	0.008840350877192983
34546	common-sweet-potato	niacin	0.01487017543859649
34547	common-sweet-potato	riboflavin	0.001059649122807018
34548	common-sweet-potato	thiamin	0.001070175438596491
34549	common-sweet-potato	vitamin_c	0.196
34550	common-sweet-potato	tocotrienol_delta	0
34551	common-sweet-potato	tocotrienol_gamma	0
34552	common-sweet-potato	tocotrienol_beta	0
34553	common-sweet-potato	tocotrienol_alpha	0.0002
34554	common-sweet-potato	tocopherol_delta	0
34555	common-sweet-potato	tocopherol_gamma	0.0001
34556	common-sweet-potato	tocopherol_beta	0
34557	common-sweet-potato	lutein_zeaxanthin	0
34558	common-sweet-potato	lycopene	0
34559	common-sweet-potato	cryptoxanthin	0
34560	common-sweet-potato	vitamin_d	0
34561	common-sweet-potato	vitamin_d_iu	0
34562	common-sweet-potato	vitamin_e_alpha-tocopherol	0.0071
34563	common-sweet-potato	carotene_alpha	0.43
34564	common-sweet-potato	carotene_beta	115.09
34565	common-sweet-potato	vitamin_a	9.61
34566	common-sweet-potato	retinol	0
34567	common-sweet-potato	vitamin_a_iu	192.18
34568	common-sweet-potato	selenium	0.002
34569	common-sweet-potato	manganese	0.004970175438596491
34570	common-sweet-potato	copper	0.001609649122807017
34571	common-sweet-potato	zinc	0.0032
34572	common-sweet-potato	sodium	0.36
34573	common-sweet-potato	potassium	4.75
34574	common-sweet-potato	phosphorus	0.54
34575	common-sweet-potato	magnesium	0.27
34576	common-sweet-potato	iron	0.0069
34577	common-sweet-potato	calcium	0.38
34578	common-sweet-potato	fiber	0.033
34579	common-sweet-potato	galactose	0
34580	common-sweet-potato	sugar	0.0648
34581	common-sweet-potato	joules	3.78
34582	common-sweet-potato	theobromine	0
34583	common-sweet-potato	caffeine	0
34584	common-sweet-potato	water	0.7578
34585	common-sweet-potato	alcohol	0
34586	common-sweet-potato	maltose	0.0312
34587	common-sweet-potato	lactose	0
34588	common-sweet-potato	fructose	0.004999999999999999
34589	common-sweet-potato	glucose	0.0057
34590	common-sweet-potato	sucrose	0.0228
34591	common-sweet-potato	starch	0.07050000000000001
34592	common-sweet-potato	calories	0.8999999999999999
34593	common-sweet-potato	ash	0.0135
34594	common-sweet-potato	carbohydrates	0.2071
34595	common-sweet-potato	fat	0.0015
34596	common-sweet-potato	protein	0.0201
34597	common-sliced-ham	18:3_n-3_c	0.000130952380952381
34598	common-sliced-ham	15:01	0
34599	common-sliced-ham	trans_polyenoic_fat	4.047619047619047e-05
34600	common-sliced-ham	trans_monoenoic_fat	5.952380952380952e-05
34601	common-sliced-ham	20:3	0
34602	common-sliced-ham	17:01	0
34603	common-sliced-ham	18:3_n-6_c	0
34604	common-sliced-ham	18:2_n-6_c	0.00350952380952381
34605	common-sliced-ham	18:1_c	0.01205
34606	common-sliced-ham	20:2_n-6_c	0.000130952380952381
34607	common-sliced-ham	18:2_CLAs	4.047619047619047e-05
34608	common-sliced-ham	18:2_t	9.047619047619048e-05
34609	common-sliced-ham	18:1_t	0.000119047619047619
34610	common-sliced-ham	17:00	8.095238095238095e-05
34611	common-sliced-ham	15:00	0
34612	common-sliced-ham	polyunsaturated_fat	0.00625
34613	common-sliced-ham	monounsaturated_fat	0.01925
34614	common-sliced-ham	22:5_n-3	0
34615	common-sliced-ham	22:1	0
34616	common-sliced-ham	20:5_n-3	0
34617	common-sliced-ham	20:01	0.0002
34618	common-sliced-ham	18:04	0
34619	common-sliced-ham	16:1	0.0007690476190476191
34620	common-sliced-ham	14:01	0
34621	common-sliced-ham	22:00	9.047619047619048e-05
34622	common-sliced-ham	22:6_n-3	0
34623	common-sliced-ham	20:4	0.000669047619047619
34624	common-sliced-ham	18:3	6.904761904761904e-05
34625	common-sliced-ham	18:2	0.001609523809523809
34626	common-sliced-ham	18:1	0.006109523809523809
34627	common-sliced-ham	20:00	4.047619047619047e-05
34628	common-sliced-ham	18:00	0.002969047619047619
34629	common-sliced-ham	16:00	0.00598095238095238
34630	common-sliced-ham	14:00	0.0003190476190476191
34631	common-sliced-ham	12:00	9.523809523809525e-06
34632	common-sliced-ham	10:00	9.523809523809525e-06
34633	common-sliced-ham	8:00	0
34634	common-sliced-ham	6:00	0
34635	common-sliced-ham	4:00	0
34636	common-sliced-ham	saturated_fat	0.0095
34637	common-sliced-ham	trans_fat	9.999999999999999e-05
34638	common-sliced-ham	cholesterol	0.64
34639	common-sliced-ham	hydroxyproline	0.00144047619047619
34640	common-sliced-ham	serine	0.008680952380952381
34641	common-sliced-ham	proline	0.009540476190476191
34642	common-sliced-ham	glycine	0.01164047619047619
34643	common-sliced-ham	glutamic_acid	0.03171904761904762
34644	common-sliced-ham	aspartic_acid	0.01934047619047619
34645	common-sliced-ham	alanine	0.01306904761904762
34646	common-sliced-ham	histidine	0.009659523809523809
34647	common-sliced-ham	arginine	0.01419047619047619
34648	common-sliced-ham	valine	0.01121904761904762
34649	common-sliced-ham	tyrosine	0.007180952380952381
34650	common-sliced-ham	phenylalanine	0.008869047619047618
34651	common-sliced-ham	cystine	0.002490476190476191
34652	common-sliced-ham	methionine	0.0053
34653	common-sliced-ham	lysine	0.01870952380952381
34654	common-sliced-ham	leucine	0.01775
34655	common-sliced-ham	isoleucine	0.01
34656	common-sliced-ham	threonine	0.009909523809523809
34657	common-sliced-ham	tryptophan	0.002080952380952381
34658	common-sliced-ham	betaine	0.036
34659	common-sliced-ham	folate_dfe	0.01
34660	common-sliced-ham	folate_food	0.01
34661	common-sliced-ham	folic_acid	0
34662	common-sliced-ham	vitamin_k	0
34663	common-sliced-ham	dihydrophylloquinone	0
34664	common-sliced-ham	menaquinone-4	0.035
34665	common-sliced-ham	choline	0.8370000000000001
34666	common-sliced-ham	vitamin_b12	0.005
34667	common-sliced-ham	folate	0.01
34668	common-sliced-ham	vitamin_b6	0.004219047619047619
34669	common-sliced-ham	pantothenic_acid	0.01031904761904762
34670	common-sliced-ham	niacin	0.06619047619047619
34671	common-sliced-ham	riboflavin	0.002259523809523809
34672	common-sliced-ham	thiamin	0.004630952380952381
34673	common-sliced-ham	vitamin_c	0
34674	common-sliced-ham	tocotrienol_delta	0
34675	common-sliced-ham	tocotrienol_gamma	0
34676	common-sliced-ham	tocotrienol_beta	0
34677	common-sliced-ham	tocotrienol_alpha	0
34678	common-sliced-ham	tocopherol_delta	0
34679	common-sliced-ham	tocopherol_gamma	0.0003
34680	common-sliced-ham	tocopherol_beta	0
34681	common-sliced-ham	lutein_zeaxanthin	0
34682	common-sliced-ham	lycopene	0
34683	common-sliced-ham	cryptoxanthin	0
34684	common-sliced-ham	vitamin_d	0.008
34685	common-sliced-ham	vitamin_d3	0.008
34686	common-sliced-ham	vitamin_d_iu	0.33
34687	common-sliced-ham	vitamin_e_alpha-tocopherol	0.0019
34688	common-sliced-ham	carotene_alpha	0
34689	common-sliced-ham	carotene_beta	0
34690	common-sliced-ham	vitamin_a	0.13
34691	common-sliced-ham	retinol	0.13
34692	common-sliced-ham	vitamin_a_iu	0.43
34693	common-sliced-ham	selenium	0.411
34694	common-sliced-ham	manganese	0.000219047619047619
34695	common-sliced-ham	copper	0.001930952380952381
34696	common-sliced-ham	zinc	0.018
34697	common-sliced-ham	sodium	9.77
34698	common-sliced-ham	potassium	3.45
34699	common-sliced-ham	phosphorus	3.080000000000001
34700	common-sliced-ham	magnesium	0.22
34701	common-sliced-ham	iron	0.0083
34702	common-sliced-ham	calcium	0.04
34703	common-sliced-ham	fiber	0
34704	common-sliced-ham	galactose	0
34705	common-sliced-ham	sugar	0.0106
34706	common-sliced-ham	joules	5.81
34707	common-sliced-ham	theobromine	0
34708	common-sliced-ham	caffeine	0
34709	common-sliced-ham	water	0.6853
34710	common-sliced-ham	alcohol	0
34711	common-sliced-ham	maltose	0
34712	common-sliced-ham	lactose	0
34713	common-sliced-ham	fructose	0
34714	common-sliced-ham	glucose	0.0058
34715	common-sliced-ham	sucrose	0.0048
34716	common-sliced-ham	calories	1.39
34717	common-sliced-ham	ash	0.0373
34718	common-sliced-ham	carbohydrates	0.0106
34719	common-sliced-ham	fat	0.051
34720	common-sliced-ham	protein	0.2218
34721	common-dried-peaches	polyunsaturated_fat	0.003670000000000001
34722	common-dried-peaches	monounsaturated_fat	0.00278
34723	common-dried-peaches	22:5_n-3	0
34724	common-dried-peaches	22:1	0
34725	common-dried-peaches	20:5_n-3	0
34726	common-dried-peaches	20:01	0
34727	common-dried-peaches	18:04	0
34728	common-dried-peaches	16:1	5.999999999999999e-05
34729	common-dried-peaches	22:6_n-3	0
34730	common-dried-peaches	20:4	2e-05
34731	common-dried-peaches	18:3	8.999999999999999e-05
34732	common-dried-peaches	18:2	0.00358
34733	common-dried-peaches	18:1	0.00272
34734	common-dried-peaches	18:00	0.0001
34735	common-dried-peaches	16:00	0.00071
34736	common-dried-peaches	14:00	0
34737	common-dried-peaches	12:00	0
34738	common-dried-peaches	10:00	0
34739	common-dried-peaches	8:00	0
34740	common-dried-peaches	6:00	0
34741	common-dried-peaches	4:00	0
34742	common-dried-peaches	saturated_fat	0.0008200000000000001
34743	common-dried-peaches	cholesterol	0
34744	common-dried-peaches	serine	0.00167
34745	common-dried-peaches	proline	0.00152
34746	common-dried-peaches	glycine	0.00126
34747	common-dried-peaches	glutamic_acid	0.00548
34748	common-dried-peaches	aspartic_acid	0.006019999999999999
34749	common-dried-peaches	alanine	0.00215
34750	common-dried-peaches	histidine	0.00067
34751	common-dried-peaches	arginine	0.00092
34752	common-dried-peaches	valine	0.00197
34753	common-dried-peaches	tyrosine	0.0009400000000000001
34754	common-dried-peaches	phenylalanine	0.00114
34755	common-dried-peaches	cystine	0.00029
34756	common-dried-peaches	methionine	0.0008699999999999999
34757	common-dried-peaches	lysine	0.00116
34758	common-dried-peaches	leucine	0.00204
34759	common-dried-peaches	isoleucine	0.00104
34760	common-dried-peaches	threonine	0.00141
34761	common-dried-peaches	tryptophan	0.0001
34762	common-dried-peaches	folate_dfe	0
34763	common-dried-peaches	folate_food	0
34764	common-dried-peaches	folic_acid	0
34765	common-dried-peaches	vitamin_k	0.157
34766	common-dried-peaches	choline	0.127
34767	common-dried-peaches	vitamin_b12	0
34768	common-dried-peaches	folate	0
34769	common-dried-peaches	vitamin_b6	0.00067
34770	common-dried-peaches	pantothenic_acid	0.00564
34771	common-dried-peaches	niacin	0.04375
34772	common-dried-peaches	riboflavin	0.00212
34773	common-dried-peaches	thiamin	2e-05
34774	common-dried-peaches	vitamin_c	0.048
34775	common-dried-peaches	tocotrienol_delta	0
34776	common-dried-peaches	tocotrienol_gamma	0
34777	common-dried-peaches	tocotrienol_beta	0
34778	common-dried-peaches	tocotrienol_alpha	0
34779	common-dried-peaches	tocopherol_delta	0
34780	common-dried-peaches	tocopherol_gamma	0
34781	common-dried-peaches	tocopherol_beta	0
34782	common-dried-peaches	lutein_zeaxanthin	5.59
34783	common-dried-peaches	lycopene	0
34784	common-dried-peaches	cryptoxanthin	4.44
34785	common-dried-peaches	vitamin_d	0
34786	common-dried-peaches	vitamin_d_iu	0
34787	common-dried-peaches	vitamin_e_alpha-tocopherol	0.0019
34788	common-dried-peaches	carotene_alpha	0.03
34789	common-dried-peaches	carotene_beta	10.74
34790	common-dried-peaches	vitamin_a	1.08
34791	common-dried-peaches	retinol	0
34792	common-dried-peaches	vitamin_a_iu	21.63
34793	common-dried-peaches	selenium	0.005
34794	common-dried-peaches	manganese	0.00305
34795	common-dried-peaches	copper	0.00364
34796	common-dried-peaches	zinc	0.0057
34797	common-dried-peaches	sodium	0.06999999999999999
34798	common-dried-peaches	potassium	9.959999999999999
34799	common-dried-peaches	phosphorus	1.19
34800	common-dried-peaches	magnesium	0.42
34801	common-dried-peaches	iron	0.0406
34802	common-dried-peaches	calcium	0.28
34803	common-dried-peaches	fiber	0.08199999999999999
34804	common-dried-peaches	sugar	0.4174
34805	common-dried-peaches	joules	10
34806	common-dried-peaches	theobromine	0
34807	common-dried-peaches	caffeine	0
34808	common-dried-peaches	water	0.318
34809	common-dried-peaches	alcohol	0
34810	common-dried-peaches	fructose	0.1349
34811	common-dried-peaches	glucose	0.1283
34812	common-dried-peaches	sucrose	0.1542
34813	common-dried-peaches	calories	2.39
34814	common-dried-peaches	ash	0.025
34815	common-dried-peaches	carbohydrates	0.6133
34816	common-dried-peaches	fat	0.0076
34817	common-dried-peaches	protein	0.0361
34818	common-slider	22:04	0
34819	common-slider	20:3_n-6	0
34820	common-slider	20:3_n-3	3.45214464486062e-06
34821	common-slider	18:3_n-3_c	0.00164408388711487
34822	common-slider	15:01	0
34823	common-slider	trans_polyenoic_fat	4.487788038318805e-05
34824	common-slider	trans_monoenoic_fat	0.003696383878484508
34825	common-slider	20:3	3.45214464486062e-06
34826	common-slider	17:01	0.0007801846897385
34827	common-slider	18:3_n-6_c	8.112539915422456e-05
34828	common-slider	22:1_c	0.0001812375938551825
34829	common-slider	18:2_n-6_c	0.01161301458531112
34830	common-slider	18:1_c	0.005003883662725468
34831	common-slider	16:1_c	2.67541209976698e-05
34832	common-slider	20:2_n-6_c	1.035643393458186e-05
34833	common-slider	24:1_c	8.630361612151549e-06
34834	common-slider	18:2_CLAs	1.639768706308794e-05
34835	common-slider	22:1_t	2.589108483645464e-06
34836	common-slider	18:1_t	0.003692931733839648
34837	common-slider	16:1_t	8.63036161215155e-07
34838	common-slider	24:00:00	2.67541209976698e-05
34839	common-slider	17:00	0.0008483645464744973
34840	common-slider	15:00	0.000356433934581859
34841	common-slider	polyunsaturated_fat	0.01938120307240873
34842	common-slider	monounsaturated_fat	0.05167515318891861
34843	common-slider	beta-sitosterol	0.03025977388452576
34844	common-slider	campesterol	0.01156986277725037
34845	common-slider	stigmasterol	0.01156986277725037
34846	common-slider	phytosterols	0.009061879692759126
34847	common-slider	22:5_n-3	0
34848	common-slider	22:1	0.0001993613532407008
34849	common-slider	20:5_n-3	2.416501251402434e-05
34850	common-slider	20:01	0.0004108052127384137
34851	common-slider	18:04	6.041253128506084e-06
34852	common-slider	16:1	0.003145766807629239
34853	common-slider	14:01	0.0006602226633295934
34854	common-slider	22:00	7.422110986450332e-05
34855	common-slider	22:6_n-3	1.639768706308794e-05
34856	common-slider	20:4	0.0002917062224907223
34857	common-slider	18:3	0.001906446880124277
34858	common-slider	18:2	0.01701303184603435
34859	common-slider	18:1	0.01742211098645033
34860	common-slider	20:00	0.000111331664796755
34861	common-slider	18:00	0.01497367739708294
34862	common-slider	16:00	0.02161819280227842
34863	common-slider	14:00	0.002260291706222491
34864	common-slider	12:00	4.228877189954259e-05
34865	common-slider	10:00	8.63036161215155e-07
34866	common-slider	8:00	0
34867	common-slider	6:00	0
34868	common-slider	4:00	0
34869	common-slider	saturated_fat	0.04035039268145335
34870	common-slider	trans_fat	0.003741261758867696
34871	common-slider	cholesterol	0.5989911107275395
34872	common-slider	hydroxyproline	0
34873	common-slider	serine	0.006863726590144127
34874	common-slider	proline	0.009588331751100371
34875	common-slider	glycine	0.01006386467592992
34876	common-slider	glutamic_acid	0.02895572624492966
34877	common-slider	aspartic_acid	0.01379390696470182
34878	common-slider	alanine	0.009457150254595668
34879	common-slider	histidine	0.004971951324760507
34880	common-slider	arginine	0.009849831707948562
34881	common-slider	valine	0.007908000345214465
34882	common-slider	tyrosine	0.005000431518080608
34883	common-slider	phenylalanine	0.006647104513679123
34884	common-slider	cystine	0.001999654785535514
34885	common-slider	methionine	0.003989816173297661
34886	common-slider	lysine	0.01203417623198412
34887	common-slider	leucine	0.01248813325278329
34888	common-slider	isoleucine	0.00710192457063951
34889	common-slider	threonine	0.006134461033917321
34890	common-slider	tryptophan	0.001021834814878743
34891	common-slider	betaine	0.04674721670838008
34892	common-slider	folate_dfe	0.9112082506257012
34893	common-slider	folate_food	0.2376154310865625
34894	common-slider	folic_acid	0.3956977647363424
34895	common-slider	vitamin_k	0.08731940968326572
34896	common-slider	dihydrophylloquinone	0
34897	common-slider	menaquinone-4	0
34898	common-slider	choline	0.5352084232329335
34899	common-slider	vitamin_b12	0.01446189695348235
34900	common-slider	folate	0.633313195822905
34901	common-slider	vitamin_b6	0.002400103564339346
34902	common-slider	pantothenic_acid	0.006144817467851903
34903	common-slider	niacin	0.03959609907655131
34904	common-slider	riboflavin	0.002570984724259946
34905	common-slider	thiamin	0.001894364373867265
34906	common-slider	vitamin_c	0.01861396392508846
34907	common-slider	tocotrienol_delta	0
34908	common-slider	tocotrienol_gamma	0
34909	common-slider	tocotrienol_beta	0
34910	common-slider	tocotrienol_alpha	1.639768706308794e-05
34911	common-slider	tocopherol_delta	0.003027530853542763
34912	common-slider	tocopherol_gamma	0.01108052127384137
34913	common-slider	tocopherol_beta	0.0002321567273668767
34914	common-slider	lutein_zeaxanthin	0.4670406490031932
34915	common-slider	lycopene	5.282695261931475
34916	common-slider	cryptoxanthin	0.05763614395443169
34917	common-slider	vitamin_d	5.954949512384569e-05
34918	common-slider	vitamin_d3	0
34919	common-slider	vitamin_d_iu	0.01186329507206352
34920	common-slider	vitamin_e_alpha-tocopherol	0.003739535686545266
34921	common-slider	carotene_alpha	0.1522257702597739
34922	common-slider	carotene_beta	0.7314783809441615
34923	common-slider	vitamin_a	0.104023474583585
34924	common-slider	retinol	0.03423319237076033
34925	common-slider	vitamin_a_iu	1.524987485975662
34926	common-slider	selenium	0.201524121860706
34927	common-slider	manganese	0.001887460084577544
34928	common-slider	fluoride	0.005672736687667213
34929	common-slider	copper	0.0009493397773366704
34930	common-slider	zinc	0.03512298265297316
34931	common-slider	sodium	2.815881591438681
34932	common-slider	potassium	2.561444722533874
34933	common-slider	phosphorus	1.472911020971779
34934	common-slider	magnesium	0.2135850522136878
34935	common-slider	iron	0.02511866747216708
34936	common-slider	calcium	0.3440450504876154
34937	common-slider	fiber	0.01363165616639337
34938	common-slider	galactose	0
34939	common-slider	sugar	0.02497022525243808
34940	common-slider	joules	10.58729006645378
34941	common-slider	theobromine	0
34942	common-slider	caffeine	0
34943	common-slider	water	0.5228825407784585
34944	common-slider	alcohol	0
34945	common-slider	maltose	0
34946	common-slider	lactose	0
34947	common-slider	fructose	0.003238111676879261
34948	common-slider	glucose	0.003367567101061534
34949	common-slider	sucrose	0.0005497540346940537
34950	common-slider	starch	0.0001078795201518944
34951	common-slider	calories	2.531218607059636
34952	common-slider	ash	0.0134228014153793
34953	common-slider	carbohydrates	0.1734797618020195
34954	common-slider	fat	0.1273979459739363
34955	common-slider	protein	0.1630957107102788
34956	common-peach	polyunsaturated_fat	0.00086
34957	common-peach	monounsaturated_fat	0.0006702857142857143
34958	common-peach	phytosterols	0.1
34959	common-peach	22:5_n-3	0
34960	common-peach	22:1	0
34961	common-peach	20:5_n-3	0
34962	common-peach	20:01	0
34963	common-peach	18:04	0
34964	common-peach	16:1	2e-05
34965	common-peach	22:6_n-3	0
34966	common-peach	20:4	0
34967	common-peach	18:3	2e-05
34968	common-peach	18:2	0.0008399999999999999
34969	common-peach	18:1	0.0006502857142857142
34970	common-peach	18:00	2e-05
34971	common-peach	16:00	0.0001702857142857143
34972	common-peach	14:00	0
34973	common-peach	12:00	0
34974	common-peach	10:00	0
34975	common-peach	8:00	0
34976	common-peach	6:00	0
34977	common-peach	4:00	0
34978	common-peach	saturated_fat	0.0001902857142857143
34979	common-peach	trans_fat	0
34980	common-peach	cholesterol	0
34981	common-peach	serine	0.00032
34982	common-peach	proline	0.00018
34983	common-peach	glycine	0.0002102857142857143
34984	common-peach	glutamic_acid	0.0005600000000000001
34985	common-peach	aspartic_acid	0.004180000000000001
34986	common-peach	alanine	0.00028
34987	common-peach	histidine	0.0001302857142857143
34988	common-peach	arginine	0.00018
34989	common-peach	valine	0.00022
34990	common-peach	tyrosine	0.00014
34991	common-peach	phenylalanine	0.0001902857142857143
34992	common-peach	cystine	0.00012
34993	common-peach	methionine	0.0001
34994	common-peach	lysine	0.0003
34995	common-peach	leucine	0.0002702857142857143
34996	common-peach	isoleucine	0.0001702857142857143
34997	common-peach	threonine	0.00016
34998	common-peach	tryptophan	0.0001
34999	common-peach	betaine	0.003
35000	common-peach	folate_dfe	0.04
35001	common-peach	folate_food	0.04
35002	common-peach	folic_acid	0
35003	common-peach	vitamin_k	0.026
35004	common-peach	dihydrophylloquinone	0
35005	common-peach	choline	0.06100000000000001
35006	common-peach	vitamin_b12	0
35007	common-peach	folate	0.04
35008	common-peach	vitamin_b6	0.0002502857142857143
35009	common-peach	pantothenic_acid	0.001530285714285714
35010	common-peach	niacin	0.008060000000000001
35011	common-peach	riboflavin	0.0003102857142857143
35012	common-peach	thiamin	0.00024
35013	common-peach	vitamin_c	0.066
35014	common-peach	tocotrienol_delta	0
35015	common-peach	tocotrienol_gamma	0
35016	common-peach	tocotrienol_beta	0
35017	common-peach	tocotrienol_alpha	0.0003
35018	common-peach	tocopherol_delta	0
35019	common-peach	tocopherol_gamma	0.0002
35020	common-peach	tocopherol_beta	0
35021	common-peach	lutein_zeaxanthin	0.91
35022	common-peach	lycopene	0
35023	common-peach	cryptoxanthin	0.67
35024	common-peach	vitamin_d	0
35025	common-peach	vitamin_d_iu	0
35026	common-peach	vitamin_e_alpha-tocopherol	0.0073
35027	common-peach	carotene_alpha	0
35028	common-peach	carotene_beta	1.62
35029	common-peach	vitamin_a	0.16
35030	common-peach	retinol	0
35031	common-peach	vitamin_a_iu	3.26
35032	common-peach	selenium	0.001
35033	common-peach	manganese	0.0006102857142857144
35034	common-peach	fluoride	0.04
35035	common-peach	copper	0.0006799999999999999
35036	common-peach	zinc	0.0017
35037	common-peach	sodium	0
35038	common-peach	potassium	1.9
35039	common-peach	phosphorus	0.2
35040	common-peach	magnesium	0.09
35041	common-peach	iron	0.0025
35042	common-peach	calcium	0.06
35043	common-peach	fiber	0.015
35044	common-peach	galactose	0.0006
35045	common-peach	sugar	0.0839
35046	common-peach	joules	1.65
35047	common-peach	theobromine	0
35048	common-peach	caffeine	0
35049	common-peach	water	0.8887
35050	common-peach	alcohol	0
35051	common-peach	maltose	0.0008
35052	common-peach	lactose	0
35053	common-peach	fructose	0.0153
35054	common-peach	glucose	0.0195
35055	common-peach	sucrose	0.0476
35056	common-peach	starch	0
35057	common-peach	calories	0.39
35058	common-peach	ash	0.0043
35059	common-peach	carbohydrates	0.0954
35060	common-peach	fat	0.0025
35061	common-peach	protein	0.0091
35062	common-peaches	polyunsaturated_fat	0.00086
35063	common-peaches	monounsaturated_fat	0.0006702857142857143
35064	common-peaches	phytosterols	0.1
35065	common-peaches	22:5_n-3	0
35066	common-peaches	22:1	0
35067	common-peaches	20:5_n-3	0
35068	common-peaches	20:01	0
35069	common-peaches	18:04	0
35070	common-peaches	16:1	2e-05
35071	common-peaches	22:6_n-3	0
35072	common-peaches	20:4	0
35073	common-peaches	18:3	2e-05
35074	common-peaches	18:2	0.0008399999999999999
35075	common-peaches	18:1	0.0006502857142857142
35076	common-peaches	18:00	2e-05
35077	common-peaches	16:00	0.0001702857142857143
35078	common-peaches	14:00	0
35079	common-peaches	12:00	0
35080	common-peaches	10:00	0
35081	common-peaches	8:00	0
35082	common-peaches	6:00	0
35083	common-peaches	4:00	0
35084	common-peaches	saturated_fat	0.0001902857142857143
35085	common-peaches	trans_fat	0
35086	common-peaches	cholesterol	0
35087	common-peaches	serine	0.00032
35088	common-peaches	proline	0.00018
35089	common-peaches	glycine	0.0002102857142857143
35090	common-peaches	glutamic_acid	0.0005600000000000001
35091	common-peaches	aspartic_acid	0.004180000000000001
35092	common-peaches	alanine	0.00028
35093	common-peaches	histidine	0.0001302857142857143
35094	common-peaches	arginine	0.00018
35095	common-peaches	valine	0.00022
35096	common-peaches	tyrosine	0.00014
35097	common-peaches	phenylalanine	0.0001902857142857143
35098	common-peaches	cystine	0.00012
35099	common-peaches	methionine	0.0001
35100	common-peaches	lysine	0.0003
35101	common-peaches	leucine	0.0002702857142857143
35102	common-peaches	isoleucine	0.0001702857142857143
35103	common-peaches	threonine	0.00016
35104	common-peaches	tryptophan	0.0001
35105	common-peaches	betaine	0.003
35106	common-peaches	folate_dfe	0.04
35107	common-peaches	folate_food	0.04
35108	common-peaches	folic_acid	0
35109	common-peaches	vitamin_k	0.026
35110	common-peaches	dihydrophylloquinone	0
35111	common-peaches	choline	0.06100000000000001
35112	common-peaches	vitamin_b12	0
35113	common-peaches	folate	0.04
35114	common-peaches	vitamin_b6	0.0002502857142857143
35115	common-peaches	pantothenic_acid	0.001530285714285714
35116	common-peaches	niacin	0.008060000000000001
35117	common-peaches	riboflavin	0.0003102857142857143
35118	common-peaches	thiamin	0.00024
35119	common-peaches	vitamin_c	0.066
35120	common-peaches	tocotrienol_delta	0
35121	common-peaches	tocotrienol_gamma	0
35122	common-peaches	tocotrienol_beta	0
35123	common-peaches	tocotrienol_alpha	0.0003
35124	common-peaches	tocopherol_delta	0
35125	common-peaches	tocopherol_gamma	0.0002
35126	common-peaches	tocopherol_beta	0
35127	common-peaches	lutein_zeaxanthin	0.91
35128	common-peaches	lycopene	0
35129	common-peaches	cryptoxanthin	0.67
35130	common-peaches	vitamin_d	0
35131	common-peaches	vitamin_d_iu	0
35132	common-peaches	vitamin_e_alpha-tocopherol	0.0073
35133	common-peaches	carotene_alpha	0
35134	common-peaches	carotene_beta	1.62
35135	common-peaches	vitamin_a	0.16
35136	common-peaches	retinol	0
35137	common-peaches	vitamin_a_iu	3.26
35138	common-peaches	selenium	0.001
35139	common-peaches	manganese	0.0006102857142857144
35140	common-peaches	fluoride	0.04
35141	common-peaches	copper	0.0006799999999999999
35142	common-peaches	zinc	0.0017
35143	common-peaches	sodium	0
35144	common-peaches	potassium	1.9
35145	common-peaches	phosphorus	0.2
35146	common-peaches	magnesium	0.09
35147	common-peaches	iron	0.0025
35148	common-peaches	calcium	0.06
35149	common-peaches	fiber	0.015
35150	common-peaches	galactose	0.0006
35151	common-peaches	sugar	0.0839
35152	common-peaches	joules	1.65
35153	common-peaches	theobromine	0
35154	common-peaches	caffeine	0
35155	common-peaches	water	0.8887
35156	common-peaches	alcohol	0
35157	common-peaches	maltose	0.0008
35158	common-peaches	lactose	0
35159	common-peaches	fructose	0.0153
35160	common-peaches	glucose	0.0195
35161	common-peaches	sucrose	0.0476
35162	common-peaches	starch	0
35163	common-peaches	calories	0.39
35164	common-peaches	ash	0.0043
35165	common-peaches	carbohydrates	0.0954
35166	common-peaches	fat	0.0025
35167	common-peaches	protein	0.0091
35168	common-peach-tea	polyunsaturated_fat	3.706087736750737e-05
35169	common-peach-tea	monounsaturated_fat	9.362747966528176e-06
35170	common-peach-tea	22:5_n-3	0
35171	common-peach-tea	22:1	0
35172	common-peach-tea	20:5_n-3	0
35173	common-peach-tea	20:01	0
35174	common-peach-tea	18:04	0
35175	common-peach-tea	16:1	0
35176	common-peach-tea	22:6_n-3	0
35177	common-peach-tea	20:4	0
35178	common-peach-tea	18:3	2.769812940097919e-05
35179	common-peach-tea	18:2	9.362747966528176e-06
35180	common-peach-tea	18:1	0
35181	common-peach-tea	18:00	0
35182	common-peach-tea	16:00	9.362747966528176e-06
35183	common-peach-tea	14:00	0
35184	common-peach-tea	12:00	0
35185	common-peach-tea	10:00	0
35186	common-peach-tea	8:00	0
35187	common-peach-tea	6:00	0
35188	common-peach-tea	4:00	0
35189	common-peach-tea	saturated_fat	1.853043868375368e-05
35190	common-peach-tea	cholesterol	0
35191	common-peach-tea	serine	0
35192	common-peach-tea	proline	0
35193	common-peach-tea	glycine	0
35194	common-peach-tea	glutamic_acid	0
35195	common-peach-tea	aspartic_acid	0
35196	common-peach-tea	alanine	0
35197	common-peach-tea	histidine	0
35198	common-peach-tea	arginine	0
35199	common-peach-tea	valine	0
35200	common-peach-tea	tyrosine	0
35201	common-peach-tea	phenylalanine	0
35202	common-peach-tea	cystine	0
35203	common-peach-tea	methionine	0
35204	common-peach-tea	lysine	0
35205	common-peach-tea	leucine	0
35206	common-peach-tea	isoleucine	0
35207	common-peach-tea	threonine	0
35208	common-peach-tea	tryptophan	0
35209	common-peach-tea	folate_dfe	0.04629371720599997
35210	common-peach-tea	folate_food	0.04629371720599997
35211	common-peach-tea	folic_acid	0
35212	common-peach-tea	vitamin_k	0
35213	common-peach-tea	choline	0.003703551992509802
35214	common-peach-tea	vitamin_b12	0
35215	common-peach-tea	folate	0.04629371720599997
35216	common-peach-tea	vitamin_b6	0
35217	common-peach-tea	pantothenic_acid	0.0001018198841359939
35218	common-peach-tea	niacin	0
35219	common-peach-tea	riboflavin	0.000143757192736068
35220	common-peach-tea	thiamin	0
35221	common-peach-tea	vitamin_c	0
35222	common-peach-tea	tocopherol_delta	0
35223	common-peach-tea	tocopherol_gamma	0
35224	common-peach-tea	lutein_zeaxanthin	0
35225	common-peach-tea	lycopene	0
35226	common-peach-tea	cryptoxanthin	0
35227	common-peach-tea	vitamin_d	0
35228	common-peach-tea	vitamin_d_iu	0
35229	common-peach-tea	vitamin_e_alpha-tocopherol	0
35230	common-peach-tea	carotene_alpha	0
35231	common-peach-tea	carotene_beta	0
35232	common-peach-tea	vitamin_a	0
35233	common-peach-tea	retinol	0
35234	common-peach-tea	vitamin_a_iu	0
35235	common-peach-tea	selenium	0.0004447305284100884
35236	common-peach-tea	manganese	0.002030545965240798
35237	common-peach-tea	fluoride	3.452578071664034
35238	common-peach-tea	copper	9.772368190063784e-05
35239	common-peach-tea	zinc	0.0001925215050617356
35240	common-peach-tea	sodium	0.0285173698480504
35241	common-peach-tea	potassium	0.3440552402130025
35242	common-peach-tea	phosphorus	0.009258782452649853
35243	common-peach-tea	magnesium	0.02777615230070026
35244	common-peach-tea	iron	0.0002221702069557415
35245	common-peach-tea	calcium	0.0007412175473501474
35246	common-peach-tea	fiber	0
35247	common-peach-tea	galactose	0
35248	common-peach-tea	sugar	0.0739735112255447
35249	common-peach-tea	joules	1.236324926365888
35250	common-peach-tea	theobromine	0.0185173698480504
35251	common-peach-tea	caffeine	0.1851744787095013
35252	common-peach-tea	water	0.9231096026683833
35253	common-peach-tea	alcohol	0
35254	common-peach-tea	maltose	0
35255	common-peach-tea	lactose	0
35256	common-peach-tea	fructose	0
35257	common-peach-tea	glucose	0
35258	common-peach-tea	sucrose	0.0739735112255447
35259	common-peach-tea	calories	0.2961099732771569
35260	common-peach-tea	ash	0.0003778258918992725
35261	common-peach-tea	carbohydrates	0.07688454561413777
35262	common-peach-tea	fat	0
35263	common-peach-tea	protein	0
35372	common-tea	trans_fat	0
35373	common-tea	cholesterol	0
35374	common-tea	serine	0
35375	common-tea	proline	0
35376	common-tea	glycine	0
35377	common-tea	glutamic_acid	0
35378	common-tea	aspartic_acid	0
35379	common-tea	alanine	0
35380	common-tea	histidine	0
35381	common-tea	arginine	0
35382	common-tea	valine	0
35383	common-tea	tyrosine	0
35384	common-tea	phenylalanine	0
35385	common-tea	cystine	0
35386	common-tea	methionine	0
35387	common-tea	lysine	0
35388	common-tea	leucine	0
35389	common-tea	isoleucine	0
35390	common-tea	threonine	0
35391	common-tea	tryptophan	0
35392	common-tea	folate_dfe	0.05
35393	common-tea	folate_food	0.05
35394	common-tea	folic_acid	0
35395	common-tea	vitamin_b12	0
35396	common-tea	folate	0.05
35397	common-tea	vitamin_b6	0
35398	common-tea	pantothenic_acid	0.0001101123595505618
35399	common-tea	niacin	0
35400	common-tea	riboflavin	0.0001398876404494382
35401	common-tea	thiamin	0
35402	common-tea	vitamin_c	0
35403	common-tea	retinol	0
35404	common-tea	vitamin_a_iu	0
35405	common-tea	selenium	0
35406	common-tea	manganese	0.002189887640449438
35407	common-tea	copper	7.977528089887641e-05
35408	common-tea	zinc	0.0001
35409	common-tea	sodium	0
35410	common-tea	potassium	0.21
35411	common-tea	phosphorus	0.01
35412	common-tea	magnesium	0.01
35413	common-tea	iron	0.0001
35414	common-tea	calcium	0
35415	common-tea	fiber	0
35416	common-tea	joules	0.04
35417	common-tea	caffeine	0.2
35418	common-tea	water	0.997
35419	common-tea	calories	0.01
35420	common-tea	ash	0.0002
35421	common-tea	carbohydrates	0.003
35422	common-tea	fat	0
35423	common-tea	protein	0
35424	common-bean	polyunsaturated_fat	0.002780225988700565
35425	common-bean	monounsaturated_fat	0.0003898305084745763
35426	common-bean	22:5_n-3	0
35427	common-bean	22:1	0
35428	common-bean	20:5_n-3	0
35429	common-bean	20:01	0
35430	common-bean	18:04	0
35431	common-bean	16:1	0
35432	common-bean	22:6_n-3	0
35433	common-bean	20:4	0
35434	common-bean	18:3	0.0017
35435	common-bean	18:2	0.001080225988700565
35436	common-bean	18:1	0.0003898305084745763
35437	common-bean	18:00	8.022598870056498e-05
35438	common-bean	16:00	0.0006502824858757062
35439	common-bean	14:00	0
35440	common-bean	12:00	0
35441	common-bean	10:00	0
35442	common-bean	8:00	0
35443	common-bean	6:00	0
35444	common-bean	4:00	0
35445	common-bean	saturated_fat	0.0007299435028248588
35446	common-bean	trans_fat	0
35447	common-bean	cholesterol	0
35448	common-bean	serine	0.005440112994350282
35449	common-bean	proline	0.004959887005649717
35450	common-bean	glycine	0.003510169491525424
35451	common-bean	glutamic_acid	0.01392994350282486
35452	common-bean	aspartic_acid	0.01085988700564972
35453	common-bean	alanine	0.003940112994350283
35454	common-bean	histidine	0.002380225988700565
35455	common-bean	arginine	0.004750282485875706
35456	common-bean	valine	0.005
35457	common-bean	tyrosine	0.002050282485875706
35458	common-bean	phenylalanine	0.005110169491525423
35459	common-bean	cystine	0.0008101694915254237
35460	common-bean	methionine	0.001129943502824859
35461	common-bean	lysine	0.006070056497175141
35462	common-bean	leucine	0.007359887005649718
35463	common-bean	isoleucine	0.0041
35464	common-bean	threonine	0.003189830508474576
35465	common-bean	tryptophan	0.001040112994350283
35466	common-bean	betaine	0.001
35467	common-bean	folate_dfe	1.3
35468	common-bean	folate_food	1.3
35469	common-bean	folic_acid	0
35470	common-bean	vitamin_k	0.084
35471	common-bean	choline	0.305
35472	common-bean	vitamin_b12	0
35473	common-bean	folate	1.3
35474	common-bean	vitamin_b6	0.0012
35475	common-bean	pantothenic_acid	0.0022
35476	common-bean	niacin	0.005780225988700564
35477	common-bean	riboflavin	0.000580225988700565
35478	common-bean	thiamin	0.0016
35479	common-bean	vitamin_c	0.012
35480	common-bean	tocotrienol_delta	0
35481	common-bean	tocotrienol_gamma	0
35482	common-bean	tocotrienol_beta	0
35483	common-bean	tocotrienol_alpha	0
35484	common-bean	tocopherol_delta	0.0001
35485	common-bean	tocopherol_gamma	0.0092
35486	common-bean	tocopherol_beta	0
35487	common-bean	lutein_zeaxanthin	0
35488	common-bean	lycopene	0
35489	common-bean	cryptoxanthin	0
35490	common-bean	vitamin_d	0
35491	common-bean	vitamin_d_iu	0
35492	common-bean	vitamin_e_alpha-tocopherol	0.0003
35493	common-bean	carotene_alpha	0
35494	common-bean	carotene_beta	0
35495	common-bean	vitamin_a	0
35496	common-bean	retinol	0
35497	common-bean	vitamin_a_iu	0
35498	common-bean	selenium	0.011
35499	common-bean	manganese	0.0043
35500	common-bean	copper	0.002159887005649717
35501	common-bean	zinc	0.01
35502	common-bean	sodium	0.01
35503	common-bean	potassium	4.05
35504	common-bean	phosphorus	1.38
35505	common-bean	magnesium	0.42
35506	common-bean	iron	0.0222
35507	common-bean	calcium	0.35
35508	common-bean	fiber	0.064
35509	common-bean	sugar	0.0032
35510	common-bean	joules	5.32
35511	common-bean	theobromine	0
35512	common-bean	caffeine	0
35513	common-bean	water	0.6694
35514	common-bean	alcohol	0
35515	common-bean	calories	1.27
35516	common-bean	ash	0.0109
35517	common-bean	carbohydrates	0.228
35518	common-bean	fat	0.005
35519	common-bean	protein	0.0867
35520	common-beef	20:3_n-6	0.0001
35521	common-beef	18:3_n-3_c	0.00016
35522	common-beef	15:01	0.0001105882352941177
35523	common-beef	trans_polyenoic_fat	0.0004105882352941177
35524	common-beef	trans_monoenoic_fat	0.005510588235294118
35525	common-beef	20:3	0.0001
35526	common-beef	17:01	0.0007705882352941176
35527	common-beef	18:2_n-6_c	0.00296
35528	common-beef	18:1_c	0.03277058823529411
35529	common-beef	16:1_c	0.002710588235294117
35530	common-beef	20:2_n-6_c	2e-05
35531	common-beef	18:2_CLAs	0.00042
35532	common-beef	18:1_t	0.005270588235294118
35533	common-beef	16:1_t	0.00024
35534	common-beef	24:00:00	5.058823529411765e-05
35535	common-beef	17:00	0.001190588235294118
35536	common-beef	15:00	0.0004905882352941177
35537	common-beef	polyunsaturated_fat	0.007330588235294117
35538	common-beef	monounsaturated_fat	0.07407058823529412
35539	common-beef	22:5_n-3	0.00012
35540	common-beef	22:1	0
35541	common-beef	20:5_n-3	3.058823529411764e-05
35542	common-beef	20:01	0.0003
35543	common-beef	18:04	0
35544	common-beef	16:1	0.00594
35545	common-beef	14:01	0.0005705882352941177
35546	common-beef	22:6_n-3	1.058823529411765e-05
35547	common-beef	20:4	0.0004505882352941177
35548	common-beef	18:3	0.0008705882352941176
35549	common-beef	18:2	0.005730588235294118
35550	common-beef	18:1	0.06639058823529412
35551	common-beef	20:00	7.058823529411765e-05
35552	common-beef	18:00	0.02216
35553	common-beef	16:00	0.03853058823529412
35554	common-beef	14:00	0.004850588235294118
35555	common-beef	12:00	0.00024
35556	common-beef	10:00	0.00024
35557	common-beef	8:00	0
35558	common-beef	6:00	0
35559	common-beef	4:00	0
35560	common-beef	saturated_fat	0.06782
35561	common-beef	trans_fat	0.00592
35562	common-beef	cholesterol	0.87
35563	common-beef	hydroxyproline	0.00236
35564	common-beef	serine	0.01055058823529412
35565	common-beef	proline	0.01223058823529412
35566	common-beef	glycine	0.01475058823529412
35567	common-beef	glutamic_acid	0.0409
35568	common-beef	aspartic_acid	0.02462
35569	common-beef	alanine	0.01611058823529412
35570	common-beef	histidine	0.008990588235294118
35571	common-beef	arginine	0.01737058823529412
35572	common-beef	valine	0.01308
35573	common-beef	tyrosine	0.008950588235294118
35574	common-beef	phenylalanine	0.01045058823529412
35575	common-beef	cystine	0.0031
35576	common-beef	methionine	0.006950588235294117
35577	common-beef	lysine	0.02342
35578	common-beef	leucine	0.02162
35579	common-beef	isoleucine	0.01208
35580	common-beef	threonine	0.01127058823529412
35581	common-beef	tryptophan	0.00222
35582	common-beef	betaine	0.125
35583	common-beef	folate_dfe	0.07
35584	common-beef	folate_food	0.07
35585	common-beef	folic_acid	0
35586	common-beef	vitamin_k	0.014
35587	common-beef	choline	0.8330000000000001
35588	common-beef	vitamin_b12	0.0181
35589	common-beef	folate	0.07
35590	common-beef	vitamin_b6	0.00478
35591	common-beef	pantothenic_acid	0.004630588235294118
35592	common-beef	niacin	0.05458
35593	common-beef	riboflavin	0.001890588235294118
35594	common-beef	thiamin	0.0006799999999999999
35595	common-beef	vitamin_c	0
35596	common-beef	tocopherol_delta	0
35597	common-beef	tocopherol_gamma	0
35598	common-beef	tocopherol_beta	0
35599	common-beef	lutein_zeaxanthin	0
35600	common-beef	lycopene	0
35601	common-beef	cryptoxanthin	0
35602	common-beef	vitamin_d	0.002
35603	common-beef	vitamin_d3	0.002
35604	common-beef	vitamin_d_iu	0.06
35605	common-beef	vitamin_e_alpha-tocopherol	0.0031
35606	common-beef	carotene_alpha	0
35607	common-beef	carotene_beta	0
35608	common-beef	vitamin_a	0.03
35609	common-beef	retinol	0.03
35610	common-beef	vitamin_a_iu	0.11
35611	common-beef	selenium	0.283
35612	common-beef	manganese	0.00028
35613	common-beef	fluoride	0.224
35614	common-beef	copper	0.0007505882352941176
35615	common-beef	zinc	0.051
35616	common-beef	sodium	0.5
35617	common-beef	potassium	2.71
35618	common-beef	phosphorus	1.8
35619	common-beef	magnesium	0.2
35620	common-beef	iron	0.022
35621	common-beef	calcium	0.13
35622	common-beef	fiber	0
35623	common-beef	sugar	0
35624	common-beef	joules	10.84
35625	common-beef	theobromine	0
35626	common-beef	caffeine	0
35627	common-beef	water	0.5697
35628	common-beef	alcohol	0
35629	common-beef	calories	2.59
35630	common-beef	ash	0.0101
35631	common-beef	carbohydrates	0
35632	common-beef	fat	0.1659
35633	common-beef	protein	0.2611
35810	common-red-beets	polyunsaturated_fat	0.00064
35811	common-red-beets	monounsaturated_fat	0.0003500000000000001
35812	common-red-beets	22:5_n-3	0
35813	common-red-beets	22:1	0
35814	common-red-beets	20:5_n-3	0
35815	common-red-beets	20:01	0
35816	common-red-beets	18:04	0
35817	common-red-beets	16:1	0
35818	common-red-beets	22:6_n-3	0
35819	common-red-beets	20:4	0
35820	common-red-beets	18:3	5e-05
35821	common-red-beets	18:2	0.00058
35822	common-red-beets	18:1	0.0003500000000000001
35823	common-red-beets	18:00	1e-05
35824	common-red-beets	16:00	0.00027
35825	common-red-beets	14:00	0
35826	common-red-beets	12:00	0
35827	common-red-beets	10:00	0
35828	common-red-beets	8:00	0
35829	common-red-beets	6:00	0
35830	common-red-beets	4:00	0
35634	common-beet	polyunsaturated_fat	0.00064
35635	common-beet	monounsaturated_fat	0.0003500000000000001
35636	common-beet	22:5_n-3	0
35637	common-beet	22:1	0
35638	common-beet	20:5_n-3	0
35639	common-beet	20:01	0
35640	common-beet	18:04	0
35641	common-beet	16:1	0
35642	common-beet	22:6_n-3	0
35643	common-beet	20:4	0
35644	common-beet	18:3	5e-05
35645	common-beet	18:2	0.00058
35646	common-beet	18:1	0.0003500000000000001
35647	common-beet	18:00	1e-05
35648	common-beet	16:00	0.00027
35649	common-beet	14:00	0
35650	common-beet	12:00	0
35651	common-beet	10:00	0
35652	common-beet	8:00	0
35653	common-beet	6:00	0
35654	common-beet	4:00	0
35655	common-beet	saturated_fat	0.00028
35656	common-beet	trans_fat	0
35657	common-beet	cholesterol	0
35658	common-beet	serine	0.00062
35659	common-beet	proline	0.00043
35660	common-beet	glycine	0.00033
35661	common-beet	glutamic_acid	0.00446
35662	common-beet	aspartic_acid	0.00121
35663	common-beet	alanine	0.00063
35664	common-beet	histidine	0.00022
35665	common-beet	arginine	0.00044
35666	common-beet	valine	0.0005899999999999999
35667	common-beet	tyrosine	0.0004
35668	common-beet	phenylalanine	0.00048
35669	common-beet	cystine	0.0002
35670	common-beet	methionine	0.00019
35671	common-beet	lysine	0.0006
35672	common-beet	leucine	0.0007099999999999999
35673	common-beet	isoleucine	0.0005
35674	common-beet	threonine	0.00049
35675	common-beet	tryptophan	0.0002
35676	common-beet	folate_dfe	0.8
35677	common-beet	folate_food	0.8
35678	common-beet	folic_acid	0
35679	common-beet	vitamin_k	0.002
35680	common-beet	choline	0.063
35681	common-beet	vitamin_b12	0
35682	common-beet	folate	0.8
35683	common-beet	vitamin_b6	0.00067
35684	common-beet	pantothenic_acid	0.00145
35685	common-beet	niacin	0.00331
35686	common-beet	riboflavin	0.0004
35687	common-beet	thiamin	0.00027
35688	common-beet	vitamin_c	0.036
35689	common-beet	lutein_zeaxanthin	0
35690	common-beet	lycopene	0
35691	common-beet	cryptoxanthin	0
35692	common-beet	vitamin_d	0
35693	common-beet	vitamin_d_iu	0
35694	common-beet	vitamin_e_alpha-tocopherol	0.0004
35695	common-beet	carotene_alpha	0
35696	common-beet	carotene_beta	0.21
35697	common-beet	vitamin_a	0.02
35698	common-beet	retinol	0
35699	common-beet	vitamin_a_iu	0.35
35700	common-beet	selenium	0.006999999999999999
35701	common-beet	manganese	0.00326
35702	common-beet	copper	0.00074
35703	common-beet	zinc	0.0035
35704	common-beet	sodium	0.77
35705	common-beet	potassium	3.05
35706	common-beet	phosphorus	0.38
35707	common-beet	magnesium	0.23
35708	common-beet	iron	0.0079
35709	common-beet	calcium	0.16
35710	common-beet	fiber	0.02
35711	common-beet	sugar	0.0796
35712	common-beet	joules	1.84
35713	common-beet	theobromine	0
35714	common-beet	caffeine	0
35715	common-beet	water	0.8706
35716	common-beet	alcohol	0
35717	common-beet	calories	0.44
35718	common-beet	ash	0.0112
35719	common-beet	carbohydrates	0.09960000000000001
35720	common-beet	fat	0.0018
35721	common-beet	protein	0.0168
35722	common-beets	polyunsaturated_fat	0.00064
35723	common-beets	monounsaturated_fat	0.0003500000000000001
35724	common-beets	22:5_n-3	0
35725	common-beets	22:1	0
35726	common-beets	20:5_n-3	0
35727	common-beets	20:01	0
35728	common-beets	18:04	0
35729	common-beets	16:1	0
35730	common-beets	22:6_n-3	0
35731	common-beets	20:4	0
35732	common-beets	18:3	5e-05
35733	common-beets	18:2	0.00058
35734	common-beets	18:1	0.0003500000000000001
35735	common-beets	18:00	1e-05
35736	common-beets	16:00	0.00027
35737	common-beets	14:00	0
35738	common-beets	12:00	0
35739	common-beets	10:00	0
35740	common-beets	8:00	0
35741	common-beets	6:00	0
35742	common-beets	4:00	0
35743	common-beets	saturated_fat	0.00028
35744	common-beets	trans_fat	0
35745	common-beets	cholesterol	0
35746	common-beets	serine	0.00062
35747	common-beets	proline	0.00043
35748	common-beets	glycine	0.00033
35749	common-beets	glutamic_acid	0.00446
35750	common-beets	aspartic_acid	0.00121
35751	common-beets	alanine	0.00063
35752	common-beets	histidine	0.00022
35753	common-beets	arginine	0.00044
35754	common-beets	valine	0.0005899999999999999
35755	common-beets	tyrosine	0.0004
35756	common-beets	phenylalanine	0.00048
35757	common-beets	cystine	0.0002
35758	common-beets	methionine	0.00019
35759	common-beets	lysine	0.0006
35760	common-beets	leucine	0.0007099999999999999
35761	common-beets	isoleucine	0.0005
35762	common-beets	threonine	0.00049
35763	common-beets	tryptophan	0.0002
35764	common-beets	folate_dfe	0.8
35765	common-beets	folate_food	0.8
35766	common-beets	folic_acid	0
35767	common-beets	vitamin_k	0.002
35768	common-beets	choline	0.063
35769	common-beets	vitamin_b12	0
35770	common-beets	folate	0.8
35771	common-beets	vitamin_b6	0.00067
35772	common-beets	pantothenic_acid	0.00145
35773	common-beets	niacin	0.00331
35774	common-beets	riboflavin	0.0004
35775	common-beets	thiamin	0.00027
35776	common-beets	vitamin_c	0.036
35777	common-beets	lutein_zeaxanthin	0
35778	common-beets	lycopene	0
35779	common-beets	cryptoxanthin	0
35780	common-beets	vitamin_d	0
35781	common-beets	vitamin_d_iu	0
35782	common-beets	vitamin_e_alpha-tocopherol	0.0004
35783	common-beets	carotene_alpha	0
35784	common-beets	carotene_beta	0.21
35785	common-beets	vitamin_a	0.02
35786	common-beets	retinol	0
35787	common-beets	vitamin_a_iu	0.35
35788	common-beets	selenium	0.006999999999999999
35789	common-beets	manganese	0.00326
35790	common-beets	copper	0.00074
35791	common-beets	zinc	0.0035
35792	common-beets	sodium	0.77
35793	common-beets	potassium	3.05
35794	common-beets	phosphorus	0.38
35795	common-beets	magnesium	0.23
35796	common-beets	iron	0.0079
35797	common-beets	calcium	0.16
35798	common-beets	fiber	0.02
35799	common-beets	sugar	0.0796
35800	common-beets	joules	1.84
35801	common-beets	theobromine	0
35802	common-beets	caffeine	0
35803	common-beets	water	0.8706
35804	common-beets	alcohol	0
35805	common-beets	calories	0.44
35806	common-beets	ash	0.0112
35807	common-beets	carbohydrates	0.09960000000000001
35808	common-beets	fat	0.0018
35809	common-beets	protein	0.0168
36746	common-can-corn	18:3_n-3_c	0.000180163095012327
36747	common-can-corn	15:01	0
36748	common-can-corn	20:3	0
36749	common-can-corn	17:01	9.861558884885265e-06
36750	common-can-corn	18:3_n-6_c	0
36751	common-can-corn	20:2_n-6_c	0
36752	common-can-corn	17:00	9.861558884885265e-06
36753	common-can-corn	15:00	2.010240849611227e-05
36754	common-can-corn	polyunsaturated_fat	0.005189835008534042
36755	common-can-corn	monounsaturated_fat	0.003740185852455908
36756	common-can-corn	22:5_n-3	0
36757	common-can-corn	22:1	0
36758	common-can-corn	20:5_n-3	0
36759	common-can-corn	20:01	4.020481699222454e-05
36760	common-can-corn	18:04	0
36761	common-can-corn	16:1	2.010240849611227e-05
36762	common-can-corn	14:01	0
36763	common-can-corn	22:00	2.996396738099754e-05
36764	common-can-corn	22:6_n-3	0
36765	common-can-corn	20:4	0
36766	common-can-corn	18:3	0.000180163095012327
36767	common-can-corn	18:2	0.00482988810923573
36768	common-can-corn	18:1	0.003670017068082686
36769	common-can-corn	20:00	7.016878437322208e-05
36770	common-can-corn	18:00	0.0003899108666793097
36771	common-can-corn	16:00	0.001899867248245781
36772	common-can-corn	14:00	2.010240849611227e-05
36773	common-can-corn	12:00	0
36774	common-can-corn	10:00	2.996396738099754e-05
36775	common-can-corn	8:00	0
36776	common-can-corn	6:00	0
36777	common-can-corn	4:00	0
36778	common-can-corn	saturated_fat	0.002449838801441305
36779	common-can-corn	trans_fat	0
36780	common-can-corn	cholesterol	0
36781	common-can-corn	serine	0.001269865351792149
36782	common-can-corn	proline	0.002870092926227954
36783	common-can-corn	glycine	0.0008298881092357293
36784	common-can-corn	glutamic_acid	0.004529869144699412
36785	common-can-corn	aspartic_acid	0.00161008913332069
36786	common-can-corn	alanine	0.001850180163095013
36787	common-can-corn	histidine	0.0006201403375687465
36788	common-can-corn	arginine	0.0009501232694860612
36789	common-can-corn	valine	0.001079840697894937
36790	common-can-corn	tyrosine	0.0008799544851128391
36791	common-can-corn	phenylalanine	0.001060117580125166
36792	common-can-corn	cystine	0.0003500853404134269
36793	common-can-corn	methionine	0.0005298691446994122
36794	common-can-corn	lysine	0.002150199127631329
36795	common-can-corn	leucine	0.002849990517731842
36796	common-can-corn	isoleucine	0.0007198937985966244
36797	common-can-corn	threonine	0.0006899298312156269
36798	common-can-corn	tryptophan	0.0002101270623933245
36799	common-can-corn	folate_dfe	0.36
36800	common-can-corn	folate_food	0.36
36801	common-can-corn	folic_acid	0
36802	common-can-corn	vitamin_k	0
36803	common-can-corn	choline	0.178
36804	common-can-corn	vitamin_b12	0
36805	common-can-corn	folate	0.36
36806	common-can-corn	vitamin_b6	0.0003701877489095392
36807	common-can-corn	pantothenic_acid	0.002089891902142993
36808	common-can-corn	niacin	0.01005006637587711
36809	common-can-corn	riboflavin	0.000890195334724066
36810	common-can-corn	thiamin	0.0003899108666793097
36811	common-can-corn	vitamin_c	0.018
36812	common-can-corn	tocotrienol_delta	0
36813	common-can-corn	tocotrienol_gamma	0.009000189645363171
36814	common-can-corn	tocotrienol_beta	0
35831	common-red-beets	saturated_fat	0.00028
35832	common-red-beets	trans_fat	0
35833	common-red-beets	cholesterol	0
35834	common-red-beets	serine	0.00062
35835	common-red-beets	proline	0.00043
35836	common-red-beets	glycine	0.00033
35837	common-red-beets	glutamic_acid	0.00446
35838	common-red-beets	aspartic_acid	0.00121
35839	common-red-beets	alanine	0.00063
35840	common-red-beets	histidine	0.00022
35841	common-red-beets	arginine	0.00044
35842	common-red-beets	valine	0.0005899999999999999
35843	common-red-beets	tyrosine	0.0004
35844	common-red-beets	phenylalanine	0.00048
35845	common-red-beets	cystine	0.0002
35846	common-red-beets	methionine	0.00019
35847	common-red-beets	lysine	0.0006
35848	common-red-beets	leucine	0.0007099999999999999
35849	common-red-beets	isoleucine	0.0005
35850	common-red-beets	threonine	0.00049
35851	common-red-beets	tryptophan	0.0002
35852	common-red-beets	folate_dfe	0.8
35853	common-red-beets	folate_food	0.8
35854	common-red-beets	folic_acid	0
35855	common-red-beets	vitamin_k	0.002
35856	common-red-beets	choline	0.063
35857	common-red-beets	vitamin_b12	0
35858	common-red-beets	folate	0.8
35859	common-red-beets	vitamin_b6	0.00067
35860	common-red-beets	pantothenic_acid	0.00145
35861	common-red-beets	niacin	0.00331
35862	common-red-beets	riboflavin	0.0004
35863	common-red-beets	thiamin	0.00027
35864	common-red-beets	vitamin_c	0.036
35865	common-red-beets	lutein_zeaxanthin	0
35866	common-red-beets	lycopene	0
35867	common-red-beets	cryptoxanthin	0
35868	common-red-beets	vitamin_d	0
35869	common-red-beets	vitamin_d_iu	0
35870	common-red-beets	vitamin_e_alpha-tocopherol	0.0004
35871	common-red-beets	carotene_alpha	0
35872	common-red-beets	carotene_beta	0.21
35873	common-red-beets	vitamin_a	0.02
35874	common-red-beets	retinol	0
35875	common-red-beets	vitamin_a_iu	0.35
35876	common-red-beets	selenium	0.006999999999999999
35877	common-red-beets	manganese	0.00326
35878	common-red-beets	copper	0.00074
35879	common-red-beets	zinc	0.0035
35880	common-red-beets	sodium	0.77
35881	common-red-beets	potassium	3.05
35882	common-red-beets	phosphorus	0.38
35883	common-red-beets	magnesium	0.23
35884	common-red-beets	iron	0.0079
35885	common-red-beets	calcium	0.16
35886	common-red-beets	fiber	0.02
35887	common-red-beets	sugar	0.0796
35888	common-red-beets	joules	1.84
35889	common-red-beets	theobromine	0
35890	common-red-beets	caffeine	0
35891	common-red-beets	water	0.8706
35892	common-red-beets	alcohol	0
35893	common-red-beets	calories	0.44
35894	common-red-beets	ash	0.0112
35895	common-red-beets	carbohydrates	0.09960000000000001
35896	common-red-beets	fat	0.0018
35897	common-red-beets	protein	0.0168
35898	common-raw-beets	polyunsaturated_fat	0.0006000000000000001
35899	common-raw-beets	monounsaturated_fat	0.0003198529411764706
35900	common-raw-beets	phytosterols	0.25
35901	common-raw-beets	22:5_n-3	0
35902	common-raw-beets	22:1	0
35903	common-raw-beets	20:5_n-3	0
35904	common-raw-beets	20:01	0
35905	common-raw-beets	18:04	0
35906	common-raw-beets	16:1	0
35907	common-raw-beets	22:6_n-3	0
35908	common-raw-beets	20:4	0
35909	common-raw-beets	18:3	5e-05
35910	common-raw-beets	18:2	0.00055
35911	common-raw-beets	18:1	0.0003198529411764706
35912	common-raw-beets	18:00	1.029411764705882e-05
35913	common-raw-beets	16:00	0.0002602941176470588
35914	common-raw-beets	14:00	0
35915	common-raw-beets	12:00	0
35916	common-raw-beets	10:00	0
35917	common-raw-beets	8:00	0
35918	common-raw-beets	6:00	0
35919	common-raw-beets	4:00	0
35920	common-raw-beets	saturated_fat	0.0002698529411764706
35921	common-raw-beets	trans_fat	0
35922	common-raw-beets	cholesterol	0
35923	common-raw-beets	serine	0.0005897058823529411
35924	common-raw-beets	proline	0.0004198529411764706
35925	common-raw-beets	glycine	0.0003102941176470588
35926	common-raw-beets	glutamic_acid	0.004280147058823529
35927	common-raw-beets	aspartic_acid	0.001160294117647059
35928	common-raw-beets	alanine	0.0006000000000000001
35929	common-raw-beets	histidine	0.0002102941176470588
35930	common-raw-beets	arginine	0.0004198529411764706
35931	common-raw-beets	valine	0.0005602941176470589
35932	common-raw-beets	tyrosine	0.0003801470588235294
35933	common-raw-beets	phenylalanine	0.0004602941176470589
35934	common-raw-beets	cystine	0.0001897058823529412
35935	common-raw-beets	methionine	0.0001801470588235294
35936	common-raw-beets	lysine	0.0005801470588235294
35937	common-raw-beets	leucine	0.0006801470588235294
35938	common-raw-beets	isoleucine	0.0004801470588235294
35939	common-raw-beets	threonine	0.0004698529411764706
35940	common-raw-beets	tryptophan	0.0001897058823529412
35941	common-raw-beets	betaine	1.287
35942	common-raw-beets	folate_dfe	1.09
35943	common-raw-beets	folate_food	1.09
35944	common-raw-beets	folic_acid	0
35945	common-raw-beets	vitamin_k	0.002
35946	common-raw-beets	choline	0.06
35947	common-raw-beets	vitamin_b12	0
35948	common-raw-beets	folate	1.09
35949	common-raw-beets	vitamin_b6	0.0006698529411764706
35950	common-raw-beets	pantothenic_acid	0.00155
35951	common-raw-beets	niacin	0.003339705882352941
35952	common-raw-beets	riboflavin	0.0004
35953	common-raw-beets	thiamin	0.0003102941176470588
35954	common-raw-beets	vitamin_c	0.04899999999999999
35955	common-raw-beets	lutein_zeaxanthin	0
35956	common-raw-beets	lycopene	0
35957	common-raw-beets	cryptoxanthin	0
35958	common-raw-beets	vitamin_d	0
35959	common-raw-beets	vitamin_d_iu	0
35960	common-raw-beets	vitamin_e_alpha-tocopherol	0.0004
35961	common-raw-beets	carotene_alpha	0
35962	common-raw-beets	carotene_beta	0.2
35963	common-raw-beets	vitamin_a	0.02
35964	common-raw-beets	retinol	0
35965	common-raw-beets	vitamin_a_iu	0.33
35966	common-raw-beets	selenium	0.006999999999999999
35967	common-raw-beets	manganese	0.003289705882352941
35968	common-raw-beets	copper	0.0007499999999999999
35969	common-raw-beets	zinc	0.0035
35970	common-raw-beets	sodium	0.78
35971	common-raw-beets	potassium	3.25
35972	common-raw-beets	phosphorus	0.4
35973	common-raw-beets	magnesium	0.23
35974	common-raw-beets	iron	0.008
35975	common-raw-beets	calcium	0.16
35976	common-raw-beets	fiber	0.028
35977	common-raw-beets	sugar	0.0676
35978	common-raw-beets	joules	1.8
35979	common-raw-beets	theobromine	0
35980	common-raw-beets	caffeine	0
35981	common-raw-beets	water	0.8758
35982	common-raw-beets	alcohol	0
35983	common-raw-beets	calories	0.43
35984	common-raw-beets	ash	0.0108
35985	common-raw-beets	carbohydrates	0.0956
35986	common-raw-beets	fat	0.0017
35987	common-raw-beets	protein	0.0161
36815	common-can-corn	tocotrienol_alpha	0.002600037929072634
36816	common-can-corn	tocopherol_delta	0
36817	common-can-corn	tocopherol_gamma	0.003099943106391049
36818	common-can-corn	tocopherol_beta	0
36819	common-can-corn	lutein_zeaxanthin	6.950000000000001
36820	common-can-corn	lycopene	0
36821	common-can-corn	cryptoxanthin	0.2
36822	common-can-corn	vitamin_d	0
36823	common-can-corn	vitamin_d_iu	0
36824	common-can-corn	vitamin_e_alpha-tocopherol	0.0009000568936089514
36825	common-can-corn	carotene_alpha	0.06000000000000001
36826	common-can-corn	carotene_beta	0.14
36827	common-can-corn	vitamin_a	0.02
36828	common-can-corn	retinol	0
36829	common-can-corn	vitamin_a_iu	0.46
36830	common-can-corn	selenium	0.006000000000000001
36831	common-can-corn	manganese	0.0006702067134458563
36832	common-can-corn	copper	0.0003299829319173146
36833	common-can-corn	zinc	0.003200075858145269
36834	common-can-corn	sodium	2.05
36835	common-can-corn	potassium	1.32
36836	common-can-corn	phosphorus	0.46
36837	common-can-corn	magnesium	0.13
36838	common-can-corn	iron	0.002700170680826854
36839	common-can-corn	calcium	0.03000000000000001
36840	common-can-corn	fiber	0.02
36841	common-can-corn	galactose	0
36842	common-can-corn	sugar	0.04440015171629054
36843	common-can-corn	joules	2.8
36844	common-can-corn	theobromine	0
36845	common-can-corn	caffeine	0
36846	common-can-corn	water	0.8141001327517543
36847	common-can-corn	alcohol	0
36848	common-can-corn	maltose	0.0007999241418547318
36849	common-can-corn	lactose	0
36850	common-can-corn	fructose	0.001800113787217903
36851	common-can-corn	glucose	0.002799924141854732
36852	common-can-corn	sucrose	0.03900018964536318
36853	common-can-corn	starch	0.08060003792907264
36854	common-can-corn	calories	0.67
36855	common-can-corn	ash	0.007500094822681587
36856	common-can-corn	carbohydrates	0.1433999620709274
36857	common-can-corn	fat	0.0121998862127821
36858	common-can-corn	protein	0.02290005689360895
35988	common-potato-chips	22:04	0
35989	common-potato-chips	20:3_n-6	0
35990	common-potato-chips	20:3_n-3	1.071428571428571e-05
35991	common-potato-chips	18:3_n-3_c	0.0034
35992	common-potato-chips	15:01	0
35993	common-potato-chips	trans_polyenoic_fat	0.0006285714285714286
35994	common-potato-chips	trans_monoenoic_fat	0.0002107142857142857
35995	common-potato-chips	20:3	1.071428571428571e-05
35996	common-potato-chips	17:01	0.0002
35997	common-potato-chips	18:3_n-6_c	0.0001785714285714286
35998	common-potato-chips	22:1_c	0.0001
35999	common-potato-chips	18:2_n-6_c	0.07817857142857143
36000	common-potato-chips	18:1_c	0.1857892857142857
36001	common-potato-chips	16:1_c	0.0006892857142857143
36002	common-potato-chips	20:2_n-6_c	8.928571428571429e-05
36003	common-potato-chips	24:1_c	0.0002107142857142857
36004	common-potato-chips	18:2_CLAs	0.0002214285714285714
36005	common-potato-chips	22:1_t	0
36006	common-potato-chips	18:1_t	0.0002107142857142857
36007	common-potato-chips	16:1_t	0
36008	common-potato-chips	24:00:00	0.0006892857142857143
36009	common-potato-chips	17:00	0.0001714285714285714
36010	common-potato-chips	15:00	7.142857142857143e-05
36011	common-potato-chips	polyunsaturated_fat	0.08282142857142857
36012	common-potato-chips	monounsaturated_fat	0.1896285714285714
36013	common-potato-chips	phytosterols	1.81
36014	common-potato-chips	22:5_n-3	0
36015	common-potato-chips	22:1	0.0001
36016	common-potato-chips	20:5_n-3	1.071428571428571e-05
36017	common-potato-chips	20:01	0.002428571428571429
36018	common-potato-chips	18:04	0
36019	common-potato-chips	16:1	0.0006892857142857143
36020	common-potato-chips	14:01	0
36021	common-potato-chips	22:00	0.001478571428571428
36022	common-potato-chips	22:6_n-3	0
36023	common-potato-chips	20:4	8.928571428571429e-05
36024	common-potato-chips	18:3	0.003578571428571428
36025	common-potato-chips	18:2	0.07903928571428571
36026	common-potato-chips	18:1	0.186
36027	common-potato-chips	20:00	0.001528571428571428
36028	common-potato-chips	18:00	0.008021428571428572
36029	common-potato-chips	16:00	0.02157142857142857
36030	common-potato-chips	14:00	0.0004392857142857143
36031	common-potato-chips	12:00	0
36032	common-potato-chips	10:00	1.071428571428571e-05
36033	common-potato-chips	8:00	2.142857142857143e-05
36034	common-potato-chips	6:00	0
36035	common-potato-chips	4:00	0
36036	common-potato-chips	saturated_fat	0.034
36037	common-potato-chips	trans_fat	0.0008392857142857143
36038	common-potato-chips	cholesterol	0
36039	common-potato-chips	serine	0.003028571428571429
36040	common-potato-chips	proline	0.002510714285714286
36041	common-potato-chips	glycine	0.002071428571428572
36042	common-potato-chips	glutamic_acid	0.0117
36043	common-potato-chips	aspartic_acid	0.01706071428571429
36044	common-potato-chips	alanine	0.002139285714285714
36045	common-potato-chips	histidine	0.001528571428571428
36046	common-potato-chips	arginine	0.003210714285714285
36047	common-potato-chips	valine	0.003921428571428571
36048	common-potato-chips	tyrosine	0.002589285714285714
36049	common-potato-chips	phenylalanine	0.0031
36050	common-potato-chips	cystine	0.0008892857142857142
36051	common-potato-chips	methionine	0.0011
36052	common-potato-chips	lysine	0.004239285714285715
36053	common-potato-chips	leucine	0.004189285714285714
36054	common-potato-chips	isoleucine	0.002828571428571429
36055	common-potato-chips	threonine	0.002528571428571429
36056	common-potato-chips	tryptophan	0.001078571428571429
36057	common-potato-chips	betaine	0.002
36058	common-potato-chips	folate_dfe	0.29
36059	common-potato-chips	folate_food	0.29
36060	common-potato-chips	folic_acid	0
36061	common-potato-chips	vitamin_k	0.221
36062	common-potato-chips	choline	0.121
36063	common-potato-chips	vitamin_b12	0
36064	common-potato-chips	folate	0.29
36065	common-potato-chips	vitamin_b6	0.005310714285714286
36066	common-potato-chips	pantothenic_acid	0.009560714285714285
36067	common-potato-chips	niacin	0.04762142857142857
36068	common-potato-chips	riboflavin	0.0008785714285714285
36069	common-potato-chips	thiamin	0.002128571428571428
36070	common-potato-chips	vitamin_c	0.216
36071	common-potato-chips	tocotrienol_delta	0
36072	common-potato-chips	tocotrienol_gamma	0.0005
36073	common-potato-chips	tocotrienol_beta	0.0001
36074	common-potato-chips	tocotrienol_alpha	0.0009
36075	common-potato-chips	tocopherol_delta	0.0017
36076	common-potato-chips	tocopherol_gamma	0.1083
36077	common-potato-chips	tocopherol_beta	0.0024
36078	common-potato-chips	lutein_zeaxanthin	0
36079	common-potato-chips	lycopene	0
36080	common-potato-chips	cryptoxanthin	0
36081	common-potato-chips	vitamin_d	0
36082	common-potato-chips	vitamin_d_iu	0
36083	common-potato-chips	vitamin_e_alpha-tocopherol	0.1045
36084	common-potato-chips	carotene_alpha	0
36085	common-potato-chips	carotene_beta	0
36086	common-potato-chips	vitamin_a	0
36087	common-potato-chips	retinol	0
36088	common-potato-chips	vitamin_a_iu	0
36089	common-potato-chips	selenium	0.025
36090	common-potato-chips	manganese	0.0043
36091	common-potato-chips	fluoride	0.6130000000000001
36092	common-potato-chips	copper	0.002339285714285714
36093	common-potato-chips	zinc	0.0109
36094	common-potato-chips	sodium	5.27
36095	common-potato-chips	potassium	11.96
36096	common-potato-chips	phosphorus	1.53
36097	common-potato-chips	magnesium	0.63
36098	common-potato-chips	iron	0.0128
36099	common-potato-chips	calcium	0.21
36100	common-potato-chips	fiber	0.031
36101	common-potato-chips	galactose	0
36102	common-potato-chips	sugar	0.0033
36103	common-potato-chips	joules	22.27
36104	common-potato-chips	theobromine	0
36105	common-potato-chips	caffeine	0
36106	common-potato-chips	water	0.0186
36107	common-potato-chips	alcohol	0
36108	common-potato-chips	maltose	0
36109	common-potato-chips	lactose	0
36110	common-potato-chips	fructose	0
36111	common-potato-chips	glucose	0
36112	common-potato-chips	sucrose	0.0033
36113	common-potato-chips	calories	5.32
36114	common-potato-chips	ash	0.0394
36115	common-potato-chips	carbohydrates	0.5383
36116	common-potato-chips	fat	0.3398
36117	common-potato-chips	protein	0.0639
36218	common-lays	22:04	0
36219	common-lays	20:3_n-6	0
36220	common-lays	20:3_n-3	1.071428571428571e-05
36221	common-lays	18:3_n-3_c	0.0034
36222	common-lays	15:01	0
36223	common-lays	trans_polyenoic_fat	0.0006285714285714286
36224	common-lays	trans_monoenoic_fat	0.0002107142857142857
36225	common-lays	20:3	1.071428571428571e-05
36226	common-lays	17:01	0.0002
36227	common-lays	18:3_n-6_c	0.0001785714285714286
36228	common-lays	22:1_c	0.0001
36229	common-lays	18:2_n-6_c	0.07817857142857143
36230	common-lays	18:1_c	0.1857892857142857
36231	common-lays	16:1_c	0.0006892857142857143
36232	common-lays	20:2_n-6_c	8.928571428571429e-05
36233	common-lays	24:1_c	0.0002107142857142857
36234	common-lays	18:2_CLAs	0.0002214285714285714
36235	common-lays	22:1_t	0
36236	common-lays	18:1_t	0.0002107142857142857
36237	common-lays	16:1_t	0
36238	common-lays	24:00:00	0.0006892857142857143
36239	common-lays	17:00	0.0001714285714285714
36240	common-lays	15:00	7.142857142857143e-05
36241	common-lays	polyunsaturated_fat	0.08282142857142857
36242	common-lays	monounsaturated_fat	0.1896285714285714
36243	common-lays	phytosterols	1.81
36244	common-lays	22:5_n-3	0
36245	common-lays	22:1	0.0001
36246	common-lays	20:5_n-3	1.071428571428571e-05
36247	common-lays	20:01	0.002428571428571429
36248	common-lays	18:04	0
36249	common-lays	16:1	0.0006892857142857143
36250	common-lays	14:01	0
36251	common-lays	22:00	0.001478571428571428
36252	common-lays	22:6_n-3	0
36253	common-lays	20:4	8.928571428571429e-05
36254	common-lays	18:3	0.003578571428571428
36255	common-lays	18:2	0.07903928571428571
36256	common-lays	18:1	0.186
36257	common-lays	20:00	0.001528571428571428
36258	common-lays	18:00	0.008021428571428572
36259	common-lays	16:00	0.02157142857142857
36260	common-lays	14:00	0.0004392857142857143
36261	common-lays	12:00	0
36262	common-lays	10:00	1.071428571428571e-05
36263	common-lays	8:00	2.142857142857143e-05
36264	common-lays	6:00	0
36265	common-lays	4:00	0
36266	common-lays	saturated_fat	0.034
36267	common-lays	trans_fat	0.0008392857142857143
36268	common-lays	cholesterol	0
36269	common-lays	serine	0.003028571428571429
36270	common-lays	proline	0.002510714285714286
36271	common-lays	glycine	0.002071428571428572
36272	common-lays	glutamic_acid	0.0117
36273	common-lays	aspartic_acid	0.01706071428571429
36274	common-lays	alanine	0.002139285714285714
36275	common-lays	histidine	0.001528571428571428
36276	common-lays	arginine	0.003210714285714285
36277	common-lays	valine	0.003921428571428571
36278	common-lays	tyrosine	0.002589285714285714
36279	common-lays	phenylalanine	0.0031
36280	common-lays	cystine	0.0008892857142857142
36281	common-lays	methionine	0.0011
36282	common-lays	lysine	0.004239285714285715
36283	common-lays	leucine	0.004189285714285714
36284	common-lays	isoleucine	0.002828571428571429
36285	common-lays	threonine	0.002528571428571429
36286	common-lays	tryptophan	0.001078571428571429
36287	common-lays	betaine	0.002
36288	common-lays	folate_dfe	0.29
36289	common-lays	folate_food	0.29
36290	common-lays	folic_acid	0
36291	common-lays	vitamin_k	0.221
36292	common-lays	choline	0.121
36293	common-lays	vitamin_b12	0
36294	common-lays	folate	0.29
36295	common-lays	vitamin_b6	0.005310714285714286
36296	common-lays	pantothenic_acid	0.009560714285714285
36297	common-lays	niacin	0.04762142857142857
36298	common-lays	riboflavin	0.0008785714285714285
36299	common-lays	thiamin	0.002128571428571428
36300	common-lays	vitamin_c	0.216
36301	common-lays	tocotrienol_delta	0
36302	common-lays	tocotrienol_gamma	0.0005
36303	common-lays	tocotrienol_beta	0.0001
36304	common-lays	tocotrienol_alpha	0.0009
36305	common-lays	tocopherol_delta	0.0017
36306	common-lays	tocopherol_gamma	0.1083
36307	common-lays	tocopherol_beta	0.0024
36308	common-lays	lutein_zeaxanthin	0
36309	common-lays	lycopene	0
36310	common-lays	cryptoxanthin	0
36311	common-lays	vitamin_d	0
36312	common-lays	vitamin_d_iu	0
36313	common-lays	vitamin_e_alpha-tocopherol	0.1045
36314	common-lays	carotene_alpha	0
36315	common-lays	carotene_beta	0
36316	common-lays	vitamin_a	0
36317	common-lays	retinol	0
36318	common-lays	vitamin_a_iu	0
36319	common-lays	selenium	0.025
36320	common-lays	manganese	0.0043
36321	common-lays	fluoride	0.6130000000000001
36118	common-potato	polyunsaturated_fat	0.0005699421965317919
36119	common-potato	monounsaturated_fat	3.005780346820809e-05
36120	common-potato	22:5_n-3	0
36121	common-potato	22:1	0
36122	common-potato	20:5_n-3	0
36123	common-potato	20:01	0
36124	common-potato	18:04	0
36125	common-potato	16:1	9.826589595375721e-06
36126	common-potato	22:6_n-3	0
36127	common-potato	20:4	0
36128	common-potato	18:3	0.0001300578034682081
36129	common-potato	18:2	0.0004300578034682081
36130	common-potato	18:1	9.826589595375721e-06
36131	common-potato	18:00	5.028901734104046e-05
36132	common-potato	16:00	0.0002202312138728324
36133	common-potato	14:00	9.826589595375721e-06
36134	common-potato	12:00	3.988439306358382e-05
36135	common-potato	10:00	9.826589595375721e-06
36136	common-potato	8:00	0
36137	common-potato	6:00	0
36138	common-potato	4:00	0
36139	common-potato	saturated_fat	0.0003398843930635838
36140	common-potato	trans_fat	0
36141	common-potato	cholesterol	0
36142	common-potato	serine	0.0009098265895953757
36143	common-potato	proline	0.0007601156069364162
36144	common-potato	glycine	0.0006901734104046243
36145	common-potato	glutamic_acid	0.004269942196531792
36146	common-potato	aspartic_acid	0.005830057803468207
36147	common-potato	alanine	0.0007601156069364162
36148	common-potato	histidine	0.0004202312138728324
36149	common-potato	arginine	0.001230057803468208
36150	common-potato	valine	0.00125028901734104
36151	common-potato	tyrosine	0.0005797687861271676
36152	common-potato	phenylalanine	0.0009901734104046244
36153	common-potato	cystine	0.0002901734104046243
36154	common-potato	methionine	0.0003797687861271676
36155	common-potato	lysine	0.0013
36156	common-potato	leucine	0.001190173410404624
36157	common-potato	isoleucine	0.0007999999999999999
36158	common-potato	threonine	0.0008098265895953757
36159	common-potato	tryptophan	0.0002502890173410404
36160	common-potato	betaine	0.002
36161	common-potato	folate_dfe	0.28
36162	common-potato	folate_food	0.28
36163	common-potato	folic_acid	0
36164	common-potato	vitamin_k	0.02
36165	common-potato	dihydrophylloquinone	0
36166	common-potato	choline	0.148
36167	common-potato	vitamin_b12	0
36168	common-potato	folate	0.28
36169	common-potato	vitamin_b6	0.003109826589595376
36170	common-potato	pantothenic_acid	0.003760115606936416
36171	common-potato	niacin	0.0141
36172	common-potato	riboflavin	0.0004797687861271676
36173	common-potato	thiamin	0.0006398843930635838
36174	common-potato	vitamin_c	0.096
36175	common-potato	tocopherol_delta	0
36176	common-potato	tocopherol_gamma	0
36177	common-potato	tocopherol_beta	0
36178	common-potato	lutein_zeaxanthin	0.3
36179	common-potato	lycopene	0
36180	common-potato	cryptoxanthin	0
36181	common-potato	vitamin_d	0
36182	common-potato	vitamin_d_iu	0
36183	common-potato	vitamin_e_alpha-tocopherol	0.0004
36184	common-potato	carotene_alpha	0
36185	common-potato	carotene_beta	0.06
36186	common-potato	vitamin_a	0.01
36187	common-potato	retinol	0
36188	common-potato	vitamin_a_iu	0.1
36189	common-potato	selenium	0.004
36190	common-potato	manganese	0.002190173410404624
36191	common-potato	copper	0.001179768786127168
36192	common-potato	zinc	0.0036
36193	common-potato	sodium	0.1
36194	common-potato	potassium	5.35
36195	common-potato	phosphorus	0.7
36196	common-potato	magnesium	0.28
36197	common-potato	iron	0.0108
36198	common-potato	calcium	0.15
36199	common-potato	fiber	0.022
36200	common-potato	galactose	0
36201	common-potato	sugar	0.0118
36202	common-potato	joules	3.9
36203	common-potato	theobromine	0
36204	common-potato	caffeine	0
36205	common-potato	water	0.7489
36206	common-potato	alcohol	0
36207	common-potato	maltose	0
36208	common-potato	lactose	0
36209	common-potato	fructose	0.0034
36210	common-potato	glucose	0.0044
36211	common-potato	sucrose	0.004
36212	common-potato	starch	0.1727
36213	common-potato	calories	0.9299999999999999
36214	common-potato	ash	0.0133
36215	common-potato	carbohydrates	0.2115
36216	common-potato	fat	0.0013
36217	common-potato	protein	0.025
36348	common-5-layer-dip	18:1-11t	0.0003543445211086423
36349	common-5-layer-dip	22:04	1.208435660546525e-05
36350	common-5-layer-dip	20:3_n-6	4.054106732156083e-05
36351	common-5-layer-dip	20:3_n-3	6.626905235255136e-06
36352	common-5-layer-dip	18:3_n-3_c	0.0009523252641016645
36353	common-5-layer-dip	15:01	0
36354	common-5-layer-dip	13:00	1.94908977507504e-06
36355	common-5-layer-dip	trans_polyenoic_fat	0.0002958718278563911
36356	common-5-layer-dip	trans_monoenoic_fat	0.002570069777413948
36357	common-5-layer-dip	20:3	8.77090398783768e-05
36358	common-5-layer-dip	17:01	9.862394261879703e-05
36359	common-5-layer-dip	18:3_n-6_c	1.44232643355553e-05
36360	common-5-layer-dip	22:1_c	0
36361	common-5-layer-dip	18:2_n-6_c	0.002599695941995089
36362	common-5-layer-dip	18:1_c	0.01047206954352317
36363	common-5-layer-dip	16:1_c	0.0007667719175145208
36364	common-5-layer-dip	20:2_n-6_c	6.159123689237128e-05
36365	common-5-layer-dip	24:1_c	3.508361595135072e-06
36366	common-5-layer-dip	18:2_CLAs	0.0001816551670369937
36367	common-5-layer-dip	22:1_t	0
36322	common-lays	copper	0.002339285714285714
36323	common-lays	zinc	0.0109
36324	common-lays	sodium	5.27
36325	common-lays	potassium	11.96
36326	common-lays	phosphorus	1.53
36327	common-lays	magnesium	0.63
36328	common-lays	iron	0.0128
36329	common-lays	calcium	0.21
36330	common-lays	fiber	0.031
36331	common-lays	galactose	0
36332	common-lays	sugar	0.0033
36333	common-lays	joules	22.27
36334	common-lays	theobromine	0
36335	common-lays	caffeine	0
36336	common-lays	water	0.0186
36337	common-lays	alcohol	0
36338	common-lays	maltose	0
36339	common-lays	lactose	0
36340	common-lays	fructose	0
36341	common-lays	glucose	0
36342	common-lays	sucrose	0.0033
36343	common-lays	calories	5.32
36344	common-lays	ash	0.0394
36345	common-lays	carbohydrates	0.5383
36346	common-lays	fat	0.3398
36347	common-lays	protein	0.0639
36859	common-peas	polyunsaturated_fat	0.00102
36860	common-peas	monounsaturated_fat	0.00019
36861	common-peas	22:5_n-3	0
36862	common-peas	22:1	0
36863	common-peas	20:5_n-3	0
36864	common-peas	20:01	0
36865	common-peas	18:04	0
36866	common-peas	16:1	0
36867	common-peas	22:6_n-3	0
36868	common-peas	20:4	0
36869	common-peas	18:3	0.00019
36870	common-peas	18:2	0.0008200000000000001
36871	common-peas	18:1	0.00019
36872	common-peas	18:00	4e-05
36873	common-peas	16:00	0.00035
36874	common-peas	14:00	0
36875	common-peas	12:00	0
36876	common-peas	10:00	0
36877	common-peas	8:00	0
36878	common-peas	6:00	0
36879	common-peas	4:00	0
36880	common-peas	saturated_fat	0.00039
36881	common-peas	trans_fat	0
36882	common-peas	cholesterol	0
36883	common-peas	serine	0.00179
36884	common-peas	proline	0.00171
36885	common-peas	glycine	0.00182
36886	common-peas	glutamic_acid	0.007330000000000001
36887	common-peas	aspartic_acid	0.0049
36888	common-peas	alanine	0.00237
36889	common-peas	histidine	0.00105
36890	common-peas	arginine	0.004229999999999999
36891	common-peas	valine	0.00232
36892	common-peas	tyrosine	0.00112
36893	common-peas	phenylalanine	0.00198
36894	common-peas	cystine	0.00032
36895	common-peas	methionine	0.00081
36896	common-peas	lysine	0.00314
36897	common-peas	leucine	0.0032
36898	common-peas	isoleucine	0.00193
36899	common-peas	threonine	0.00201
36900	common-peas	tryptophan	0.00037
36901	common-peas	betaine	0.002
36902	common-peas	folate_dfe	0.63
36903	common-peas	folate_food	0.63
36904	common-peas	folic_acid	0
36905	common-peas	vitamin_k	0.259
36906	common-peas	choline	0.297
36907	common-peas	vitamin_b12	0
36908	common-peas	folate	0.63
36909	common-peas	vitamin_b6	0.00216
36910	common-peas	pantothenic_acid	0.00153
36911	common-peas	niacin	0.02021
36912	common-peas	riboflavin	0.00149
36913	common-peas	thiamin	0.00259
36914	common-peas	vitamin_c	0.142
36915	common-peas	tocopherol_delta	0.0002
36916	common-peas	tocopherol_gamma	0.0099
36917	common-peas	tocopherol_beta	0
36918	common-peas	lutein_zeaxanthin	25.93
36919	common-peas	lycopene	0
36920	common-peas	cryptoxanthin	0
36921	common-peas	vitamin_d	0
36922	common-peas	vitamin_d_iu	0
36923	common-peas	vitamin_e_alpha-tocopherol	0.0014
36924	common-peas	carotene_alpha	0.22
36925	common-peas	carotene_beta	4.7
36926	common-peas	vitamin_a	0.4
36927	common-peas	retinol	0
36928	common-peas	vitamin_a_iu	8.01
36929	common-peas	selenium	0.019
36930	common-peas	manganese	0.005249999999999999
36931	common-peas	copper	0.00173
36932	common-peas	zinc	0.0119
36933	common-peas	sodium	0.03
36934	common-peas	potassium	2.71
36935	common-peas	phosphorus	1.17
36936	common-peas	magnesium	0.39
36937	common-peas	iron	0.0154
36938	common-peas	calcium	0.27
36939	common-peas	fiber	0.05500000000000001
36940	common-peas	galactose	0
36941	common-peas	sugar	0.0593
36942	common-peas	joules	3.52
36943	common-peas	theobromine	0
36944	common-peas	caffeine	0
36945	common-peas	water	0.7787
36946	common-peas	alcohol	0
36947	common-peas	maltose	0.0018
36948	common-peas	lactose	0
36949	common-peas	fructose	0.0041
36950	common-peas	glucose	0.0013
36951	common-peas	sucrose	0.0522
36952	common-peas	calories	0.8400000000000001
36953	common-peas	ash	0.0092
36954	common-peas	carbohydrates	0.1563
36955	common-peas	fat	0.0022
36956	common-peas	protein	0.0536
36368	common-5-layer-dip	18:1_t	0.002458971660234671
36369	common-5-layer-dip	16:1_t	0.0001110981171792773
36370	common-5-layer-dip	24:00:00	3.586325186138074e-05
36371	common-5-layer-dip	17:00	0.0004806455385335049
36372	common-5-layer-dip	15:00	0.0007468912018087553
36373	common-5-layer-dip	polyunsaturated_fat	0.006985927571823959
36374	common-5-layer-dip	monounsaturated_fat	0.02707558570147741
36375	common-5-layer-dip	phytosterols	0.01552450005847269
36376	common-5-layer-dip	22:5_n-3	4.32697930066659e-05
36377	common-5-layer-dip	22:1	1.169453865045024e-06
36378	common-5-layer-dip	20:5_n-3	2.45585311659455e-05
36379	common-5-layer-dip	20:01	0.000194129341597474
36380	common-5-layer-dip	18:04	0
36381	common-5-layer-dip	16:1	0.001369430475967723
36382	common-5-layer-dip	14:01	0.000626437453709118
36383	common-5-layer-dip	22:00	5.457451370210112e-05
36384	common-5-layer-dip	22:6_n-3	3.508361595135072e-06
36385	common-5-layer-dip	20:4	0.0001278602892449226
36386	common-5-layer-dip	18:3	0.001127743343858418
36387	common-5-layer-dip	18:2	0.005475382996140804
36388	common-5-layer-dip	18:1	0.02377304798659026
36389	common-5-layer-dip	20:00	0.0001356566483452228
36390	common-5-layer-dip	18:00	0.008855494484075938
36391	common-5-layer-dip	16:00	0.02351186995673021
36392	common-5-layer-dip	14:00	0.007068179160332125
36393	common-5-layer-dip	12:00	0.002042646084278642
36394	common-5-layer-dip	10:00	0.001769383697813122
36395	common-5-layer-dip	8:00	0.0006962148676568044
36396	common-5-layer-dip	6:00	0.001046271391260282
36397	common-5-layer-dip	4:00	0.0007675515534245508
36398	common-5-layer-dip	saturated_fat	0.04721592016528282
36399	common-5-layer-dip	trans_fat	0.002865941605270339
36400	common-5-layer-dip	cholesterol	0.2412680778076638
36401	common-5-layer-dip	hydroxyproline	0
36402	common-5-layer-dip	serine	0.002729505321015087
36403	common-5-layer-dip	proline	0.004677815460180096
36404	common-5-layer-dip	glycine	0.001865278914746813
36405	common-5-layer-dip	glutamic_acid	0.01133122831637625
36406	common-5-layer-dip	aspartic_acid	0.005888979846411726
36407	common-5-layer-dip	alanine	0.002243012513156356
36408	common-5-layer-dip	histidine	0.001551085643004717
36409	common-5-layer-dip	arginine	0.002543172338517912
36410	common-5-layer-dip	valine	0.003388687482945464
36411	common-5-layer-dip	tyrosine	0.002322535375979418
36412	common-5-layer-dip	phenylalanine	0.002969243363349316
36413	common-5-layer-dip	cystine	0.0004950688028690602
36414	common-5-layer-dip	methionine	0.001181538221650489
36415	common-5-layer-dip	lysine	0.003553580477916813
36416	common-5-layer-dip	leucine	0.004974077105991502
36417	common-5-layer-dip	isoleucine	0.002880364869605895
36418	common-5-layer-dip	threonine	0.002602424667680194
36419	common-5-layer-dip	tryptophan	0.001010018321443886
36420	common-5-layer-dip	betaine	0.002446107667719175
36421	common-5-layer-dip	folate_dfe	0.1409421899972713
36422	common-5-layer-dip	folate_food	0.1409421899972713
36423	common-5-layer-dip	folic_acid	0
36424	common-5-layer-dip	vitamin_k	0.1245982925973571
36425	common-5-layer-dip	dihydrophylloquinone	0
36426	common-5-layer-dip	menaquinone-4	0.0229193466651074
36427	common-5-layer-dip	choline	0.1769496745020076
36428	common-5-layer-dip	vitamin_b12	0.00168206447588976
36429	common-5-layer-dip	folate	0.1409421899972713
36430	common-5-layer-dip	vitamin_b6	0.000921529645655479
36431	common-5-layer-dip	pantothenic_acid	0.002574357774919113
36432	common-5-layer-dip	niacin	0.003830351225977469
36433	common-5-layer-dip	riboflavin	0.001337075585701478
36434	common-5-layer-dip	thiamin	0.0005137800647097806
36435	common-5-layer-dip	vitamin_c	0.05417144193661561
36436	common-5-layer-dip	tocotrienol_delta	0
36437	common-5-layer-dip	tocotrienol_gamma	0.000581608388882392
36438	common-5-layer-dip	tocotrienol_beta	0
36439	common-5-layer-dip	tocotrienol_alpha	0.0002986005535414962
36440	common-5-layer-dip	tocopherol_delta	0
36441	common-5-layer-dip	tocopherol_gamma	0.004722254707051807
36442	common-5-layer-dip	tocopherol_beta	3.079561844618564e-05
36443	common-5-layer-dip	lutein_zeaxanthin	0.9072233267064281
36444	common-5-layer-dip	lycopene	3.085867150040931
36445	common-5-layer-dip	cryptoxanthin	0.2782812926363389
36446	common-5-layer-dip	vitamin_d	0.0006607414337504386
36447	common-5-layer-dip	vitamin_d3	0.0006607414337504386
36448	common-5-layer-dip	vitamin_d2	0
36449	common-5-layer-dip	vitamin_d_iu	0.02642965735001754
36450	common-5-layer-dip	vitamin_e_alpha-tocopherol	0.006656141581881262
36451	common-5-layer-dip	carotene_alpha	0.2840116165750595
36452	common-5-layer-dip	carotene_beta	2.230918411102015
36453	common-5-layer-dip	vitamin_a	0.8386348575215375
36454	common-5-layer-dip	retinol	0.6346236307644331
36455	common-5-layer-dip	vitamin_a_iu	6.306134175340117
36456	common-5-layer-dip	selenium	0.06804194441195961
36457	common-5-layer-dip	manganese	0.001742876076872101
36458	common-5-layer-dip	fluoride	0.04119011421666082
36459	common-5-layer-dip	copper	0.0009566132616068298
36460	common-5-layer-dip	zinc	0.00820800686079601
36461	common-5-layer-dip	sodium	3.011823568393561
36462	common-5-layer-dip	potassium	2.375510856430048
36463	common-5-layer-dip	phosphorus	1.159411374887928
36464	common-5-layer-dip	magnesium	0.2483276809729856
36465	common-5-layer-dip	iron	0.01119752075780611
36466	common-5-layer-dip	calcium	1.255541652048493
36467	common-5-layer-dip	fiber	0.02342494055276186
36468	common-5-layer-dip	galactose	0.0001103184812692473
36469	common-5-layer-dip	sugar	0.01535531906599618
36470	common-5-layer-dip	joules	5.889607453319301
36471	common-5-layer-dip	theobromine	0
36472	common-5-layer-dip	caffeine	0
36473	common-5-layer-dip	water	0.7426398471913617
36474	common-5-layer-dip	alcohol	0
36475	common-5-layer-dip	maltose	0
36476	common-5-layer-dip	lactose	0.007775698748684365
36477	common-5-layer-dip	fructose	0.001976766849881106
36478	common-5-layer-dip	glucose	0.00195142868280513
36479	common-5-layer-dip	sucrose	0.002485869099130707
36480	common-5-layer-dip	starch	0.0333894671188555
36481	common-5-layer-dip	calories	1.404838420457646
36482	common-5-layer-dip	ash	0.01584064241998987
36483	common-5-layer-dip	carbohydrates	0.08960589404747983
36484	common-5-layer-dip	fat	0.09542392702607883
36485	common-5-layer-dip	protein	0.05648267259189959
36486	common-potato-chip	22:04	0
36487	common-potato-chip	20:3_n-6	0
36488	common-potato-chip	20:3_n-3	1.071428571428571e-05
36489	common-potato-chip	18:3_n-3_c	0.0034
36490	common-potato-chip	15:01	0
36491	common-potato-chip	trans_polyenoic_fat	0.0006285714285714286
36492	common-potato-chip	trans_monoenoic_fat	0.0002107142857142857
36493	common-potato-chip	20:3	1.071428571428571e-05
36494	common-potato-chip	17:01	0.0002
36495	common-potato-chip	18:3_n-6_c	0.0001785714285714286
36496	common-potato-chip	22:1_c	0.0001
36497	common-potato-chip	18:2_n-6_c	0.07817857142857143
36498	common-potato-chip	18:1_c	0.1857892857142857
36499	common-potato-chip	16:1_c	0.0006892857142857143
36500	common-potato-chip	20:2_n-6_c	8.928571428571429e-05
36501	common-potato-chip	24:1_c	0.0002107142857142857
36502	common-potato-chip	18:2_CLAs	0.0002214285714285714
36503	common-potato-chip	22:1_t	0
36504	common-potato-chip	18:1_t	0.0002107142857142857
36505	common-potato-chip	16:1_t	0
36506	common-potato-chip	24:00:00	0.0006892857142857143
36507	common-potato-chip	17:00	0.0001714285714285714
36508	common-potato-chip	15:00	7.142857142857143e-05
36509	common-potato-chip	polyunsaturated_fat	0.08282142857142857
36510	common-potato-chip	monounsaturated_fat	0.1896285714285714
36511	common-potato-chip	phytosterols	1.81
36512	common-potato-chip	22:5_n-3	0
36513	common-potato-chip	22:1	0.0001
36514	common-potato-chip	20:5_n-3	1.071428571428571e-05
36515	common-potato-chip	20:01	0.002428571428571429
36516	common-potato-chip	18:04	0
36517	common-potato-chip	16:1	0.0006892857142857143
36518	common-potato-chip	14:01	0
36519	common-potato-chip	22:00	0.001478571428571428
36520	common-potato-chip	22:6_n-3	0
36521	common-potato-chip	20:4	8.928571428571429e-05
36522	common-potato-chip	18:3	0.003578571428571428
36523	common-potato-chip	18:2	0.07903928571428571
36524	common-potato-chip	18:1	0.186
36525	common-potato-chip	20:00	0.001528571428571428
36526	common-potato-chip	18:00	0.008021428571428572
36527	common-potato-chip	16:00	0.02157142857142857
36528	common-potato-chip	14:00	0.0004392857142857143
36529	common-potato-chip	12:00	0
36530	common-potato-chip	10:00	1.071428571428571e-05
36531	common-potato-chip	8:00	2.142857142857143e-05
36532	common-potato-chip	6:00	0
36533	common-potato-chip	4:00	0
36534	common-potato-chip	saturated_fat	0.034
36535	common-potato-chip	trans_fat	0.0008392857142857143
36536	common-potato-chip	cholesterol	0
36537	common-potato-chip	serine	0.003028571428571429
36538	common-potato-chip	proline	0.002510714285714286
36539	common-potato-chip	glycine	0.002071428571428572
36540	common-potato-chip	glutamic_acid	0.0117
36541	common-potato-chip	aspartic_acid	0.01706071428571429
36542	common-potato-chip	alanine	0.002139285714285714
36543	common-potato-chip	histidine	0.001528571428571428
36544	common-potato-chip	arginine	0.003210714285714285
36545	common-potato-chip	valine	0.003921428571428571
36546	common-potato-chip	tyrosine	0.002589285714285714
36547	common-potato-chip	phenylalanine	0.0031
36548	common-potato-chip	cystine	0.0008892857142857142
36549	common-potato-chip	methionine	0.0011
36550	common-potato-chip	lysine	0.004239285714285715
36551	common-potato-chip	leucine	0.004189285714285714
36552	common-potato-chip	isoleucine	0.002828571428571429
36553	common-potato-chip	threonine	0.002528571428571429
36554	common-potato-chip	tryptophan	0.001078571428571429
36555	common-potato-chip	betaine	0.002
36556	common-potato-chip	folate_dfe	0.29
36557	common-potato-chip	folate_food	0.29
36558	common-potato-chip	folic_acid	0
36559	common-potato-chip	vitamin_k	0.221
36560	common-potato-chip	choline	0.121
36561	common-potato-chip	vitamin_b12	0
36562	common-potato-chip	folate	0.29
36563	common-potato-chip	vitamin_b6	0.005310714285714286
36564	common-potato-chip	pantothenic_acid	0.009560714285714285
36565	common-potato-chip	niacin	0.04762142857142857
36566	common-potato-chip	riboflavin	0.0008785714285714285
36567	common-potato-chip	thiamin	0.002128571428571428
36568	common-potato-chip	vitamin_c	0.216
36569	common-potato-chip	tocotrienol_delta	0
36570	common-potato-chip	tocotrienol_gamma	0.0005
36571	common-potato-chip	tocotrienol_beta	0.0001
36572	common-potato-chip	tocotrienol_alpha	0.0009
36573	common-potato-chip	tocopherol_delta	0.0017
36574	common-potato-chip	tocopherol_gamma	0.1083
36575	common-potato-chip	tocopherol_beta	0.0024
36576	common-potato-chip	lutein_zeaxanthin	0
36577	common-potato-chip	lycopene	0
36578	common-potato-chip	cryptoxanthin	0
36579	common-potato-chip	vitamin_d	0
36580	common-potato-chip	vitamin_d_iu	0
36581	common-potato-chip	vitamin_e_alpha-tocopherol	0.1045
36582	common-potato-chip	carotene_alpha	0
36583	common-potato-chip	carotene_beta	0
36584	common-potato-chip	vitamin_a	0
36585	common-potato-chip	retinol	0
36586	common-potato-chip	vitamin_a_iu	0
36587	common-potato-chip	selenium	0.025
36588	common-potato-chip	manganese	0.0043
36589	common-potato-chip	fluoride	0.6130000000000001
36590	common-potato-chip	copper	0.002339285714285714
36591	common-potato-chip	zinc	0.0109
36592	common-potato-chip	sodium	5.27
36593	common-potato-chip	potassium	11.96
36594	common-potato-chip	phosphorus	1.53
36595	common-potato-chip	magnesium	0.63
36596	common-potato-chip	iron	0.0128
36597	common-potato-chip	calcium	0.21
36598	common-potato-chip	fiber	0.031
36599	common-potato-chip	galactose	0
36600	common-potato-chip	sugar	0.0033
36601	common-potato-chip	joules	22.27
36602	common-potato-chip	theobromine	0
36603	common-potato-chip	caffeine	0
36604	common-potato-chip	water	0.0186
36605	common-potato-chip	alcohol	0
36606	common-potato-chip	maltose	0
36607	common-potato-chip	lactose	0
36608	common-potato-chip	fructose	0
36609	common-potato-chip	glucose	0
36610	common-potato-chip	sucrose	0.0033
36611	common-potato-chip	calories	5.32
36612	common-potato-chip	ash	0.0394
36613	common-potato-chip	carbohydrates	0.5383
36614	common-potato-chip	fat	0.3398
36615	common-potato-chip	protein	0.0639
30706	cafe-3-scrambled-eggs	calories	1.64591102674224
30707	cafe-3-scrambled-eggs	fat	0.1139877306119884
30708	cafe-3-scrambled-eggs	saturated_fat	0.0334782862348596
30709	cafe-3-scrambled-eggs	trans_fat	0
30710	cafe-3-scrambled-eggs	cholesterol	3.640516804214853
30711	cafe-3-scrambled-eggs	sodium	1.499252796962721
30712	cafe-3-scrambled-eggs	carbohydrates	0.02082295551337112
30713	cafe-3-scrambled-eggs	fiber	0
30714	cafe-3-scrambled-eggs	sugar	0
30715	cafe-3-scrambled-eggs	protein	0.1249377330802267
30716	cafe-3-scrambled-eggs	vitamin_a	0
30717	cafe-3-scrambled-eggs	vitamin_c	0
30718	cafe-3-scrambled-eggs	calcium	0.6240603865709887
30719	cafe-3-scrambled-eggs	iron	0.01660451193954162
30720	cafe-3-scrambled-eggs	water	0
30721	cafe-3-scrambled-eggs	potassium	1.352145796590241
30722	cafe-3-scrambled-eggs	vitamin_d	0
30723	cafe-3-turkey-sausage-link	calories	1.965608465608466
30724	cafe-3-turkey-sausage-link	fat	0.1428571428571428
30725	cafe-3-turkey-sausage-link	saturated_fat	0.03562610229276895
30726	cafe-3-turkey-sausage-link	trans_fat	0
30727	cafe-3-turkey-sausage-link	cholesterol	0.7142857142857143
30728	cafe-3-turkey-sausage-link	sodium	6.964197530864197
30729	cafe-3-turkey-sausage-link	carbohydrates	0.01781305114638448
30730	cafe-3-turkey-sausage-link	fiber	0
30731	cafe-3-turkey-sausage-link	sugar	0
30732	cafe-3-turkey-sausage-link	protein	0.1606701940035273
30733	cafe-3-turkey-sausage-link	vitamin_a	0
30734	cafe-3-turkey-sausage-link	vitamin_c	0
30735	cafe-3-turkey-sausage-link	calcium	0.2320987654320988
30736	cafe-3-turkey-sausage-link	iron	0.01781305114638448
30737	cafe-3-turkey-sausage-link	water	0
30738	cafe-3-turkey-sausage-link	potassium	2.5
30739	cafe-3-turkey-sausage-link	vitamin_d	0
30740	cafe-3-cajun-potato	calories	1.176618795666414
30741	cafe-3-cajun-potato	fat	0.05663457009212702
30742	cafe-3-cajun-potato	saturated_fat	0.004272240297085017
30743	cafe-3-cajun-potato	trans_fat	0
30744	cafe-3-cajun-potato	cholesterol	0
30745	cafe-3-cajun-potato	sodium	1.25428593337496
30746	cafe-3-cajun-potato	carbohydrates	0.1496379550209778
30747	cafe-3-cajun-potato	fiber	0.01610305958132045
30748	cafe-3-cajun-potato	sugar	0.01215945315324197
30749	cafe-3-cajun-potato	protein	0.01774622892635315
30750	cafe-3-cajun-potato	vitamin_a	0
30751	cafe-3-cajun-potato	vitamin_c	0.08084393177560878
30752	cafe-3-cajun-potato	calcium	0.09552291125790091
30753	cafe-3-cajun-potato	iron	0.006901311249137335
30754	cafe-3-cajun-potato	water	0.7602396836351287
30755	cafe-3-cajun-potato	potassium	4.273116654069034
30756	cafe-3-cajun-potato	vitamin_d	0
30757	cafe-3-garlic-fried-rice	calories	1.389789687280726
30758	cafe-3-garlic-fried-rice	fat	0.05736663442756632
30759	cafe-3-garlic-fried-rice	saturated_fat	0.006732282717945799
30760	cafe-3-garlic-fried-rice	trans_fat	0
30761	cafe-3-garlic-fried-rice	cholesterol	0
30762	cafe-3-garlic-fried-rice	sodium	0.1757979177334016
30763	cafe-3-garlic-fried-rice	carbohydrates	0.1893573040526445
30764	cafe-3-garlic-fried-rice	fiber	0.005120327700972862
30765	cafe-3-garlic-fried-rice	sugar	0.00663746183459445
30766	cafe-3-garlic-fried-rice	protein	0.01934346020367525
30767	cafe-3-garlic-fried-rice	vitamin_a	0.1573078454798885
30768	cafe-3-garlic-fried-rice	vitamin_c	0.1908744381862661
30769	cafe-3-garlic-fried-rice	calcium	0.1367317137926457
30770	cafe-3-garlic-fried-rice	iron	0.008533879501621437
30771	cafe-3-garlic-fried-rice	water	0.6875462251806338
30772	cafe-3-garlic-fried-rice	potassium	0.8277863116572792
30773	cafe-3-garlic-fried-rice	vitamin_d	0
30774	cafe-3-chocolate-chip-pancakes	calories	2.214626224527215
30775	cafe-3-chocolate-chip-pancakes	fat	0.05902177519339235
30776	cafe-3-chocolate-chip-pancakes	saturated_fat	0.01746206366668413
30777	cafe-3-chocolate-chip-pancakes	trans_fat	0
30778	cafe-3-chocolate-chip-pancakes	cholesterol	0.04278205598337611
30779	cafe-3-chocolate-chip-pancakes	sodium	7.018701870187019
30780	cafe-3-chocolate-chip-pancakes	carbohydrates	0.4003178095587336
30781	cafe-3-chocolate-chip-pancakes	fiber	0.01178689297501179
30782	cafe-3-chocolate-chip-pancakes	sugar	0.02575654390835909
30783	cafe-3-chocolate-chip-pancakes	protein	0.03431295510503431
30784	cafe-3-chocolate-chip-pancakes	vitamin_a	0
30785	cafe-3-chocolate-chip-pancakes	vitamin_c	0
30786	cafe-3-chocolate-chip-pancakes	calcium	0.6998795117606998
30787	cafe-3-chocolate-chip-pancakes	iron	0.01362040966001362
30788	cafe-3-chocolate-chip-pancakes	water	0.4176925629070843
30789	cafe-3-chocolate-chip-pancakes	potassium	0.1933050447901933
30790	cafe-3-chocolate-chip-pancakes	vitamin_d	0
30791	cafe-3-roasted-vegetables	calories	0.397087327780397
30792	cafe-3-roasted-vegetables	fat	0.01178689297501179
30793	cafe-3-roasted-vegetables	saturated_fat	0.001833516685001833
30794	cafe-3-roasted-vegetables	trans_fat	0
30795	cafe-3-roasted-vegetables	cholesterol	0
30796	cafe-3-roasted-vegetables	sodium	0.9398955768592732
30797	cafe-3-roasted-vegetables	carbohydrates	0.06478425620339812
30798	cafe-3-roasted-vegetables	fiber	0.01955751130668622
30799	cafe-3-roasted-vegetables	sugar	0.02575654390835909
30800	cafe-3-roasted-vegetables	protein	0.01842247716835176
30801	cafe-3-roasted-vegetables	vitamin_a	0.5048282606038381
30802	cafe-3-roasted-vegetables	vitamin_c	0.5864634082455864
30803	cafe-3-roasted-vegetables	calcium	0.2616690240452617
30804	cafe-3-roasted-vegetables	iron	0.006460963556673127
30805	cafe-3-roasted-vegetables	water	0.8855012485375521
30806	cafe-3-roasted-vegetables	potassium	2.787381912794454
30807	cafe-3-roasted-vegetables	vitamin_d	0
30808	cafe-3-mini-butter-croissant	calories	3.463452870860278
30809	cafe-3-mini-butter-croissant	fat	0.1732314324906917
30810	cafe-3-mini-butter-croissant	saturated_fat	0.09602194787379972
30811	cafe-3-mini-butter-croissant	trans_fat	0
30812	cafe-3-mini-butter-croissant	cholesterol	0.3844797178130511
30813	cafe-3-mini-butter-croissant	sodium	3.461493239271017
30814	cafe-3-mini-butter-croissant	carbohydrates	0.4232804232804233
30815	cafe-3-mini-butter-croissant	fiber	0
30816	cafe-3-mini-butter-croissant	sugar	0.03840877914951989
30817	cafe-3-mini-butter-croissant	protein	0.03840877914951989
30818	cafe-3-mini-butter-croissant	vitamin_a	0
30819	cafe-3-mini-butter-croissant	vitamin_c	0
30820	cafe-3-mini-butter-croissant	calcium	0
30821	cafe-3-mini-butter-croissant	iron	0.007838526357044876
30822	cafe-3-mini-butter-croissant	water	0
30823	cafe-3-mini-butter-croissant	potassium	0.3844797178130511
30824	cafe-3-mini-butter-croissant	vitamin_d	0
30825	cafe-3-mini-apple-coronet-danish	calories	3.025326278659612
30826	cafe-3-mini-apple-coronet-danish	fat	0.1628218694885361
30827	cafe-3-mini-apple-coronet-danish	saturated_fat	0.03499118165784832
30828	cafe-3-mini-apple-coronet-danish	trans_fat	0
30829	cafe-3-mini-apple-coronet-danish	cholesterol	0.1162610229276896
30830	cafe-3-mini-apple-coronet-danish	sodium	1.744197530864197
30831	cafe-3-mini-apple-coronet-danish	carbohydrates	0.3487830687830688
30832	cafe-3-mini-apple-coronet-danish	fiber	0
30833	cafe-3-mini-apple-coronet-danish	sugar	0.1698765432098765
30834	cafe-3-mini-apple-coronet-danish	protein	0.02342151675485009
30835	cafe-3-mini-apple-coronet-danish	vitamin_a	0
30836	cafe-3-mini-apple-coronet-danish	vitamin_c	0
30837	cafe-3-mini-apple-coronet-danish	calcium	0
30838	cafe-3-mini-apple-coronet-danish	iron	0.008465608465608464
30839	cafe-3-mini-apple-coronet-danish	water	0
30840	cafe-3-mini-apple-coronet-danish	potassium	0
30841	cafe-3-mini-apple-coronet-danish	vitamin_d	0
30842	cafe-3-mini-cinnamon-swirl-danish	calories	3.490652557319224
30843	cafe-3-mini-cinnamon-swirl-danish	fat	0.2093827160493827
30844	cafe-3-mini-cinnamon-swirl-danish	saturated_fat	0.08126984126984126
30845	cafe-3-mini-cinnamon-swirl-danish	trans_fat	0
30846	cafe-3-mini-cinnamon-swirl-danish	cholesterol	0.2325220458553792
30847	cafe-3-mini-cinnamon-swirl-danish	sodium	1.046349206349206
30848	cafe-3-mini-cinnamon-swirl-danish	carbohydrates	0.3487830687830688
30849	cafe-3-mini-cinnamon-swirl-danish	fiber	0
30850	cafe-3-mini-cinnamon-swirl-danish	sugar	0.1399647266313933
30851	cafe-3-mini-cinnamon-swirl-danish	protein	0.04656084656084655
30852	cafe-3-mini-cinnamon-swirl-danish	vitamin_a	0
30853	cafe-3-mini-cinnamon-swirl-danish	vitamin_c	0
30854	cafe-3-mini-cinnamon-swirl-danish	calcium	0.6975661375661375
30855	cafe-3-mini-cinnamon-swirl-danish	iron	0.09058201058201058
30856	cafe-3-mini-cinnamon-swirl-danish	water	0
30857	cafe-3-mini-cinnamon-swirl-danish	potassium	0.6975661375661375
30858	cafe-3-mini-cinnamon-swirl-danish	vitamin_d	0
30859	cafe-3-mini-cheese-plait-danish	calories	3.502222222222222
30860	cafe-3-mini-cheese-plait-danish	fat	0.2249029982363315
30861	cafe-3-mini-cheese-plait-danish	saturated_fat	0.08747795414462081
30862	cafe-3-mini-cheese-plait-danish	trans_fat	0
30863	cafe-3-mini-cheese-plait-danish	cholesterol	0.2500176366843033
30864	cafe-3-mini-cheese-plait-danish	sodium	1.874850088183421
30865	cafe-3-mini-cheese-plait-danish	carbohydrates	0.2999647266313933
30866	cafe-3-mini-cheese-plait-danish	fiber	0.02511463844797178
30867	cafe-3-mini-cheese-plait-danish	sugar	0.06687830687830688
30868	cafe-3-mini-cheese-plait-danish	protein	0.04994708994708994
30869	cafe-3-mini-cheese-plait-danish	vitamin_a	0
30870	cafe-3-mini-cheese-plait-danish	vitamin_c	0
30871	cafe-3-mini-cheese-plait-danish	calcium	0.6498765432098765
30872	cafe-3-mini-cheese-plait-danish	iron	0.009029982363315696
30873	cafe-3-mini-cheese-plait-danish	water	0
30874	cafe-3-mini-cheese-plait-danish	potassium	0
30875	cafe-3-mini-cheese-plait-danish	vitamin_d	0
30876	cafe-3-mini-maple-pecan-danish	calories	3.862574955908289
30877	cafe-3-mini-maple-pecan-danish	fat	0.2618694885361552
30878	cafe-3-mini-maple-pecan-danish	saturated_fat	0.1072310405643739
30879	cafe-3-mini-maple-pecan-danish	trans_fat	0
30880	cafe-3-mini-maple-pecan-danish	cholesterol	0.1190828924162257
30881	cafe-3-mini-maple-pecan-danish	sodium	1.904761904761905
30882	cafe-3-mini-maple-pecan-danish	carbohydrates	0.3298765432098765
30883	cafe-3-mini-maple-pecan-danish	fiber	0.0237037037037037
30884	cafe-3-mini-maple-pecan-danish	sugar	0.1199294532627866
30885	cafe-3-mini-maple-pecan-danish	protein	0.04204585537918871
30886	cafe-3-mini-maple-pecan-danish	vitamin_a	0
30887	cafe-3-mini-maple-pecan-danish	vitamin_c	0
30888	cafe-3-mini-maple-pecan-danish	calcium	0.6191181657848324
30889	cafe-3-mini-maple-pecan-danish	iron	0.008465608465608464
30890	cafe-3-mini-maple-pecan-danish	water	0
30891	cafe-3-mini-maple-pecan-danish	potassium	0
30892	cafe-3-mini-maple-pecan-danish	vitamin_d	0
30893	cafe-3-oatmeal	calories	0.5525963803368725
30894	cafe-3-oatmeal	fat	0.008699975142928163
30895	cafe-3-oatmeal	saturated_fat	0.001479587609341524
30896	cafe-3-oatmeal	trans_fat	0
30897	cafe-3-oatmeal	cholesterol	0
30898	cafe-3-oatmeal	sodium	1.162364025898702
30899	cafe-3-oatmeal	carbohydrates	0.09587727708533077
30900	cafe-3-oatmeal	fiber	0.01449995857154694
30901	cafe-3-oatmeal	sugar	0
30902	cafe-3-oatmeal	protein	0.01739995028585633
30903	cafe-3-oatmeal	vitamin_a	0
30904	cafe-3-oatmeal	vitamin_c	0
30905	cafe-3-oatmeal	calcium	0.04071825100907874
30906	cafe-3-oatmeal	iron	0.005799983428618775
30907	cafe-3-oatmeal	water	0.8584567309399523
30908	cafe-3-oatmeal	potassium	0.5231821786631631
30909	cafe-3-oatmeal	vitamin_d	0
30910	cafe-3-mung-bean-patty	calories	1.755472559394128
30911	cafe-3-mung-bean-patty	fat	0.1228343189127503
30912	cafe-3-mung-bean-patty	saturated_fat	0.008818342151675485
30913	cafe-3-mung-bean-patty	trans_fat	0
30914	cafe-3-mung-bean-patty	cholesterol	0
30915	cafe-3-mung-bean-patty	sodium	4.561365286855483
30916	cafe-3-mung-bean-patty	carbohydrates	0.01753293910156655
30917	cafe-3-mung-bean-patty	fiber	0
30918	cafe-3-mung-bean-patty	sugar	0
30919	cafe-3-mung-bean-patty	protein	0.1228343189127503
30920	cafe-3-mung-bean-patty	vitamin_a	0
30921	cafe-3-mung-bean-patty	vitamin_c	0
30922	cafe-3-mung-bean-patty	calcium	0.1754331362174499
30923	cafe-3-mung-bean-patty	iron	0
30924	cafe-3-mung-bean-patty	water	0
30925	cafe-3-mung-bean-patty	potassium	0
30926	cafe-3-mung-bean-patty	vitamin_d	0
30927	cafe-3-vegan-breakfast-sausage-patty	calories	2.530317153973067
30928	cafe-3-vegan-breakfast-sausage-patty	fat	0.1838066354195386
30929	cafe-3-vegan-breakfast-sausage-patty	saturated_fat	0.05400414002564539
30930	cafe-3-vegan-breakfast-sausage-patty	trans_fat	0
30931	cafe-3-vegan-breakfast-sausage-patty	cholesterol	0
30932	cafe-3-vegan-breakfast-sausage-patty	sodium	3.416965352449223
30933	cafe-3-vegan-breakfast-sausage-patty	carbohydrates	0.052603708517687
30934	cafe-3-vegan-breakfast-sausage-patty	fiber	0.01750539384947987
30935	cafe-3-vegan-breakfast-sausage-patty	sugar	0
30936	cafe-3-vegan-breakfast-sausage-patty	protein	0.1752289924332935
30937	cafe-3-vegan-breakfast-sausage-patty	vitamin_a	0
30938	cafe-3-vegan-breakfast-sausage-patty	vitamin_c	0
30939	cafe-3-vegan-breakfast-sausage-patty	calcium	0.1768044778797467
30940	cafe-3-vegan-breakfast-sausage-patty	iron	0.0393871361613297
30941	cafe-3-vegan-breakfast-sausage-patty	water	0
30942	cafe-3-vegan-breakfast-sausage-patty	potassium	0
30943	cafe-3-vegan-breakfast-sausage-patty	vitamin_d	0
30944	cafe-3-fried-breaded-cod-with-tartar-sauce	calories	2.611887426702242
30945	cafe-3-fried-breaded-cod-with-tartar-sauce	fat	0.1854112965224076
30946	cafe-3-fried-breaded-cod-with-tartar-sauce	saturated_fat	0.02389243129983871
30947	cafe-3-fried-breaded-cod-with-tartar-sauce	trans_fat	0
30948	cafe-3-fried-breaded-cod-with-tartar-sauce	cholesterol	0.3320821839340358
30949	cafe-3-fried-breaded-cod-with-tartar-sauce	sodium	5.173276654758136
30950	cafe-3-fried-breaded-cod-with-tartar-sauce	carbohydrates	0.1236075310149384
30951	cafe-3-fried-breaded-cod-with-tartar-sauce	fiber	7.537044574081612e-05
30952	cafe-3-fried-breaded-cod-with-tartar-sauce	sugar	0.001432038469075506
30953	cafe-3-fried-breaded-cod-with-tartar-sauce	protein	0.1070260329519589
30954	cafe-3-fried-breaded-cod-with-tartar-sauce	vitamin_a	0
30955	cafe-3-fried-breaded-cod-with-tartar-sauce	vitamin_c	0.001884261143520403
30956	cafe-3-fried-breaded-cod-with-tartar-sauce	calcium	0.001205927131853058
30957	cafe-3-fried-breaded-cod-with-tartar-sauce	iron	0.007612415019822428
30958	cafe-3-fried-breaded-cod-with-tartar-sauce	water	0.007310933236859163
30959	cafe-3-fried-breaded-cod-with-tartar-sauce	potassium	1.46098072023998
30960	cafe-3-fried-breaded-cod-with-tartar-sauce	vitamin_d	0
30961	cafe-3-vegan-chicken-tenders	calories	2.966560495582054
30962	cafe-3-vegan-chicken-tenders	fat	0.1327577281142787
30963	cafe-3-vegan-chicken-tenders	saturated_fat	0.01983030175401651
30964	cafe-3-vegan-chicken-tenders	trans_fat	0
30965	cafe-3-vegan-chicken-tenders	cholesterol	0
30966	cafe-3-vegan-chicken-tenders	sodium	4.22455623118973
30967	cafe-3-vegan-chicken-tenders	carbohydrates	0.2446322180982214
30968	cafe-3-vegan-chicken-tenders	fiber	0.05554239385085157
30969	cafe-3-vegan-chicken-tenders	sugar	0.03343072994814288
30970	cafe-3-vegan-chicken-tenders	protein	0.1890020795493432
30971	cafe-3-vegan-chicken-tenders	vitamin_a	0
30972	cafe-3-vegan-chicken-tenders	vitamin_c	0
30973	cafe-3-vegan-chicken-tenders	calcium	0.3335175971991893
30974	cafe-3-vegan-chicken-tenders	iron	0.02105872752638922
30975	cafe-3-vegan-chicken-tenders	water	0
30976	cafe-3-vegan-chicken-tenders	potassium	2.779225565295218
30977	cafe-3-vegan-chicken-tenders	vitamin_d	0
30978	cafe-3-regular-fries	calories	2.054180770536878
30979	cafe-3-regular-fries	fat	0.1100923461171908
30980	cafe-3-regular-fries	saturated_fat	0.01029719456220491
30981	cafe-3-regular-fries	trans_fat	0
30982	cafe-3-regular-fries	cholesterol	0
30983	cafe-3-regular-fries	sodium	4.785456855850231
30984	cafe-3-regular-fries	carbohydrates	0.2440654200488569
30985	cafe-3-regular-fries	fiber	0.01106400692322017
30986	cafe-3-regular-fries	sugar	0
30987	cafe-3-regular-fries	protein	0.02223755846944252
30988	cafe-3-regular-fries	vitamin_a	0
30989	cafe-3-regular-fries	vitamin_c	0
30990	cafe-3-regular-fries	calcium	0
30991	cafe-3-regular-fries	iron	0.006572677380130796
30992	cafe-3-regular-fries	water	0
30993	cafe-3-regular-fries	potassium	3.328294280675232
30994	cafe-3-regular-fries	vitamin_d	0
30995	cafe-3-creamy-coleslaw-salad	calories	1.053681657848324
30996	cafe-3-creamy-coleslaw-salad	fat	0.08465608465608465
30997	cafe-3-creamy-coleslaw-salad	saturated_fat	0.01146384479717813
30998	cafe-3-creamy-coleslaw-salad	trans_fat	0
30999	cafe-3-creamy-coleslaw-salad	cholesterol	0.07616843033509699
31000	cafe-3-creamy-coleslaw-salad	sodium	4.079475308641975
31001	cafe-3-creamy-coleslaw-salad	carbohydrates	0.06657848324514991
31002	cafe-3-creamy-coleslaw-salad	fiber	0.02579365079365079
31003	cafe-3-creamy-coleslaw-salad	sugar	0.03472222222222222
31004	cafe-3-creamy-coleslaw-salad	protein	0.01664462081128748
31005	cafe-3-creamy-coleslaw-salad	vitamin_a	0.4166666666666666
31006	cafe-3-creamy-coleslaw-salad	vitamin_c	0.2582671957671958
31007	cafe-3-creamy-coleslaw-salad	calcium	0.2939814814814815
31008	cafe-3-creamy-coleslaw-salad	iron	0.003306878306878306
31009	cafe-3-creamy-coleslaw-salad	water	0.7583774250440916
31010	cafe-3-creamy-coleslaw-salad	potassium	1.916776895943562
31011	cafe-3-creamy-coleslaw-salad	vitamin_d	0
31012	cafe-3-cheese-pizza	calories	2.501505570611262
31013	cafe-3-cheese-pizza	fat	0.08925882909622747
31014	cafe-3-cheese-pizza	saturated_fat	0.04764055577063707
31015	cafe-3-cheese-pizza	trans_fat	0
31016	cafe-3-cheese-pizza	cholesterol	0.2083064481438465
31017	cafe-3-cheese-pizza	sodium	3.928571428571429
31018	cafe-3-cheese-pizza	carbohydrates	0.3214393255043662
31019	cafe-3-cheese-pizza	fiber	0.01193702413214608
31020	cafe-3-cheese-pizza	sugar	0.006022282445046673
31021	cafe-3-cheese-pizza	protein	0.107110594915473
31022	cafe-3-cheese-pizza	vitamin_a	0
31023	cafe-3-cheese-pizza	vitamin_c	0
31024	cafe-3-cheese-pizza	calcium	1.785714285714286
31025	cafe-3-cheese-pizza	iron	0.01957241794640169
31026	cafe-3-cheese-pizza	water	0
31027	cafe-3-cheese-pizza	potassium	2.85703531638491
31028	cafe-3-cheese-pizza	vitamin_d	0
31029	cafe-3-pepperoni-pizza	calories	2.83241417280218
31030	cafe-3-pepperoni-pizza	fat	0.1392271586275114
31031	cafe-3-pepperoni-pizza	saturated_fat	0.06336142138611275
31032	cafe-3-pepperoni-pizza	trans_fat	0
31033	cafe-3-pepperoni-pizza	cholesterol	0.3129811595420061
31034	cafe-3-pepperoni-pizza	sodium	5.877961609884008
31035	cafe-3-pepperoni-pizza	carbohydrates	0.2789208962048468
31036	cafe-3-pepperoni-pizza	fiber	0.01026473689613019
31037	cafe-3-pepperoni-pizza	sugar	0.005225684238029917
31038	cafe-3-pepperoni-pizza	protein	0.1149650532366582
31039	cafe-3-pepperoni-pizza	vitamin_a	0
31040	cafe-3-pepperoni-pizza	vitamin_c	0
31041	cafe-3-pepperoni-pizza	calcium	1.549508692365835
31042	cafe-3-pepperoni-pizza	iron	0.01875647378292881
31043	cafe-3-pepperoni-pizza	water	0
31044	cafe-3-pepperoni-pizza	potassium	2.479120591995371
31045	cafe-3-pepperoni-pizza	vitamin_d	0
31046	cafe-3-penne-pasta	calories	1.478751344592418
31047	cafe-3-penne-pasta	fat	0.01632621859660043
31048	cafe-3-penne-pasta	saturated_fat	0.001310465706750536
31049	cafe-3-penne-pasta	trans_fat	0
31050	cafe-3-penne-pasta	cholesterol	0
31051	cafe-3-penne-pasta	sodium	3.440955329500221
31052	cafe-3-penne-pasta	carbohydrates	0.2926160717698386
31053	cafe-3-penne-pasta	fiber	0.01392369813422445
31054	cafe-3-penne-pasta	sugar	0.01419671182313081
31055	cafe-3-penne-pasta	protein	0.04881484757645748
31056	cafe-3-penne-pasta	vitamin_a	0
31057	cafe-3-penne-pasta	vitamin_c	0
31058	cafe-3-penne-pasta	calcium	0
31059	cafe-3-penne-pasta	iron	0.01250402695191137
31060	cafe-3-penne-pasta	water	0.5876892667398342
31061	cafe-3-penne-pasta	potassium	0
31062	cafe-3-penne-pasta	vitamin_d	0
31063	cafe-3-pesto-alfredo-sauce	calories	2.030217519106408
31064	cafe-3-pesto-alfredo-sauce	fat	0.1671957671957672
31065	cafe-3-pesto-alfredo-sauce	saturated_fat	0.08653733098177543
31066	cafe-3-pesto-alfredo-sauce	trans_fat	0
31067	cafe-3-pesto-alfredo-sauce	cholesterol	0.4666666666666666
31068	cafe-3-pesto-alfredo-sauce	sodium	3.80082304526749
31069	cafe-3-pesto-alfredo-sauce	carbohydrates	0.07442680776014109
31070	cafe-3-pesto-alfredo-sauce	fiber	0.001293356848912404
31071	cafe-3-pesto-alfredo-sauce	sugar	0.02586713697824809
31072	cafe-3-pesto-alfredo-sauce	protein	0.04514991181657848
31073	cafe-3-pesto-alfredo-sauce	vitamin_a	0
31074	cafe-3-pesto-alfredo-sauce	vitamin_c	0
31075	cafe-3-pesto-alfredo-sauce	calcium	1.512992357436802
31076	cafe-3-pesto-alfredo-sauce	iron	0.004232804232804232
31077	cafe-3-pesto-alfredo-sauce	water	0
31078	cafe-3-pesto-alfredo-sauce	potassium	1.279835390946502
31079	cafe-3-pesto-alfredo-sauce	vitamin_d	0.004703115814226925
31080	cafe-3-roasted-zucchini-mushroom	calories	0.3852584804965757
31081	cafe-3-roasted-zucchini-mushroom	fat	0.01969811493621017
31082	cafe-3-roasted-zucchini-mushroom	saturated_fat	0.00236682776365316
31083	cafe-3-roasted-zucchini-mushroom	trans_fat	0
31084	cafe-3-roasted-zucchini-mushroom	cholesterol	0
31085	cafe-3-roasted-zucchini-mushroom	sodium	1.535078677935821
31086	cafe-3-roasted-zucchini-mushroom	carbohydrates	0.04260289974575689
31087	cafe-3-roasted-zucchini-mushroom	fiber	0.01122334455667789
31088	cafe-3-roasted-zucchini-mushroom	sugar	0.02328653122303916
31089	cafe-3-roasted-zucchini-mushroom	protein	0.01977446421890866
31090	cafe-3-roasted-zucchini-mushroom	vitamin_a	0.04153400978797804
31091	cafe-3-roasted-zucchini-mushroom	vitamin_c	0.08299167029325759
31092	cafe-3-roasted-zucchini-mushroom	calcium	0.1190285317269444
31093	cafe-3-roasted-zucchini-mushroom	iron	0.003893813417622941
31094	cafe-3-roasted-zucchini-mushroom	water	0.5203967108729013
31095	cafe-3-roasted-zucchini-mushroom	potassium	2.638020415798193
31096	cafe-3-roasted-zucchini-mushroom	vitamin_d	0
31097	cafe-3-grilled-paprika-tofu	calories	1.453334045926638
31098	cafe-3-grilled-paprika-tofu	fat	0.06030320845135659
31099	cafe-3-grilled-paprika-tofu	saturated_fat	0.0009798157946306096
31100	cafe-3-grilled-paprika-tofu	trans_fat	0
31101	cafe-3-grilled-paprika-tofu	cholesterol	0
31102	cafe-3-grilled-paprika-tofu	sodium	1.094899613418132
31103	cafe-3-grilled-paprika-tofu	carbohydrates	0.06849803146099442
31104	cafe-3-grilled-paprika-tofu	fiber	0.02538613649724761
31105	cafe-3-grilled-paprika-tofu	sugar	0
31106	cafe-3-grilled-paprika-tofu	protein	0.1597990486879376
31107	cafe-3-grilled-paprika-tofu	vitamin_a	0
31108	cafe-3-grilled-paprika-tofu	vitamin_c	0
31109	cafe-3-grilled-paprika-tofu	calcium	2.283148949815616
31110	cafe-3-grilled-paprika-tofu	iron	0
31111	cafe-3-grilled-paprika-tofu	water	0
31112	cafe-3-grilled-paprika-tofu	potassium	1.59825770936882
31113	cafe-3-grilled-paprika-tofu	vitamin_d	0
31114	cafe-3-turkey-and-bean-chili	calories	1.102689594356261
31115	cafe-3-turkey-and-bean-chili	fat	0.04488536155202821
31116	cafe-3-turkey-and-bean-chili	saturated_fat	0.01428571428571429
31117	cafe-3-turkey-and-bean-chili	trans_fat	0
31118	cafe-3-turkey-and-bean-chili	cholesterol	0.2041005291005291
31119	cafe-3-turkey-and-bean-chili	sodium	2.081569664902998
31120	cafe-3-turkey-and-bean-chili	carbohydrates	0.09391534391534391
31121	cafe-3-turkey-and-bean-chili	fiber	0.02861552028218695
31122	cafe-3-turkey-and-bean-chili	sugar	0.02041446208112875
31123	cafe-3-turkey-and-bean-chili	protein	0.08161375661375661
31124	cafe-3-turkey-and-bean-chili	vitamin_a	0
31125	cafe-3-turkey-and-bean-chili	vitamin_c	0
31126	cafe-3-turkey-and-bean-chili	calcium	0.3101851851851851
31127	cafe-3-turkey-and-bean-chili	iron	0.01631393298059965
31128	cafe-3-turkey-and-bean-chili	water	0
31129	cafe-3-turkey-and-bean-chili	potassium	2.734656084656085
31130	cafe-3-turkey-and-bean-chili	vitamin_d	0
31131	cafe-3-broccoli-cheddar-soup	calories	1.184479717813051
31132	cafe-3-broccoli-cheddar-soup	fat	0.09391534391534391
31133	cafe-3-broccoli-cheddar-soup	saturated_fat	0.04488536155202821
31134	cafe-3-broccoli-cheddar-soup	trans_fat	0
31135	cafe-3-broccoli-cheddar-soup	cholesterol	0.265299823633157
31136	cafe-3-broccoli-cheddar-soup	sodium	2.436640211640212
31137	cafe-3-broccoli-cheddar-soup	carbohydrates	0.04898589065255731
31138	cafe-3-broccoli-cheddar-soup	fiber	0.0082010582010582
31139	cafe-3-broccoli-cheddar-soup	sugar	0
31140	cafe-3-broccoli-cheddar-soup	protein	0.04488536155202821
31141	cafe-3-broccoli-cheddar-soup	vitamin_a	0
31142	cafe-3-broccoli-cheddar-soup	vitamin_c	0
31143	cafe-3-broccoli-cheddar-soup	calcium	1.3836860670194
31144	cafe-3-broccoli-cheddar-soup	iron	0.004409171075837742
31145	cafe-3-broccoli-cheddar-soup	water	0
31146	cafe-3-broccoli-cheddar-soup	potassium	1.02037037037037
31147	cafe-3-broccoli-cheddar-soup	vitamin_d	0
31148	cafe-3-chicken-breast	calories	1.274262198706643
31149	cafe-3-chicken-breast	fat	0.0364021164021164
31150	cafe-3-chicken-breast	saturated_fat	0.006678424456202234
31151	cafe-3-chicken-breast	trans_fat	9.40623162845385e-05
31152	cafe-3-chicken-breast	cholesterol	0.7156261022927689
31153	cafe-3-chicken-breast	sodium	2.290605526161082
31154	cafe-3-chicken-breast	carbohydrates	0.0002821869488536155
31155	cafe-3-chicken-breast	fiber	0.000188124632569077
31156	cafe-3-chicken-breast	sugar	0
31157	cafe-3-chicken-breast	protein	0.2206701940035273
31158	cafe-3-chicken-breast	vitamin_a	0.08823045267489713
31159	cafe-3-chicken-breast	vitamin_c	0
31160	cafe-3-chicken-breast	calcium	0.05606114050558494
31161	cafe-3-chicken-breast	iron	0.003856554967666078
31162	cafe-3-chicken-breast	water	0.724373897707231
31163	cafe-3-chicken-breast	potassium	3.302339800117577
31164	cafe-3-chicken-breast	vitamin_d	0
31165	cafe-3-stir-fried-cabbage	calories	0.3020772094846169
31166	cafe-3-stir-fried-cabbage	fat	0.0009798157946306096
31167	cafe-3-stir-fried-cabbage	saturated_fat	0.0002939447383891828
31168	cafe-3-stir-fried-cabbage	trans_fat	0
31169	cafe-3-stir-fried-cabbage	cholesterol	0
31170	cafe-3-stir-fried-cabbage	sodium	1.154125024495395
31171	cafe-3-stir-fried-cabbage	carbohydrates	0.07211444248481284
31172	cafe-3-stir-fried-cabbage	fiber	0.02400548696844993
31173	cafe-3-stir-fried-cabbage	sugar	0.03488144228884969
31174	cafe-3-stir-fried-cabbage	protein	0.01234567901234568
31175	cafe-3-stir-fried-cabbage	vitamin_a	0.04781501077797373
31176	cafe-3-stir-fried-cabbage	vitamin_c	0.3495982755242014
31177	cafe-3-stir-fried-cabbage	calcium	0.3824221046443269
31178	cafe-3-stir-fried-cabbage	iron	0.004605134234763863
31179	cafe-3-stir-fried-cabbage	water	0.8976092494611013
31180	cafe-3-stir-fried-cabbage	potassium	1.624240642759161
31181	cafe-3-stir-fried-cabbage	vitamin_d	0
31182	cafe-3-forbidden-rice	calories	0.9809757236227823
31183	cafe-3-forbidden-rice	fat	0.009790953418404396
31184	cafe-3-forbidden-rice	saturated_fat	0
31185	cafe-3-forbidden-rice	trans_fat	0
31186	cafe-3-forbidden-rice	cholesterol	0
31187	cafe-3-forbidden-rice	sodium	0
31188	cafe-3-forbidden-rice	carbohydrates	0.2157251789604731
31189	cafe-3-forbidden-rice	fiber	0.01958190683680879
31190	cafe-3-forbidden-rice	sugar	0
31191	cafe-3-forbidden-rice	protein	0.02613082269945015
31192	cafe-3-forbidden-rice	vitamin_a	0
31193	cafe-3-forbidden-rice	vitamin_c	0
31194	cafe-3-forbidden-rice	calcium	0
31195	cafe-3-forbidden-rice	iron	0.006484075111526091
31196	cafe-3-forbidden-rice	water	0.7058564166407302
31197	cafe-3-forbidden-rice	potassium	0.7843137254901958
31198	cafe-3-forbidden-rice	vitamin_d	0
31199	cafe-3-savory-lentils	calories	0.8179749939353409
31200	cafe-3-savory-lentils	fat	0.007605410331556552
31201	cafe-3-savory-lentils	saturated_fat	0.0009178943503602736
31202	cafe-3-savory-lentils	trans_fat	0
31203	cafe-3-savory-lentils	cholesterol	0
31204	cafe-3-savory-lentils	sodium	1.335405152009861
31205	cafe-3-savory-lentils	carbohydrates	0.1372252053788609
31206	cafe-3-savory-lentils	fiber	0.02556991404575048
31207	cafe-3-savory-lentils	sugar	0.005113982809150095
31208	cafe-3-savory-lentils	protein	0.05579486372547091
31209	cafe-3-savory-lentils	vitamin_a	0.01311277643371819
31210	cafe-3-savory-lentils	vitamin_c	0.001770224818551956
31211	cafe-3-savory-lentils	calcium	0.09769018443120053
31212	cafe-3-savory-lentils	iron	0.01429292631275283
31213	cafe-3-savory-lentils	water	0.7701133599522694
31214	cafe-3-savory-lentils	potassium	1.632278410469241
31215	cafe-3-savory-lentils	vitamin_d	0
31216	cafe-3-chicken-fried-steak-with-gravy	calories	1.713943254396329
31217	cafe-3-chicken-fried-steak-with-gravy	fat	0.04109518672625468
31218	cafe-3-chicken-fried-steak-with-gravy	saturated_fat	0.01191760415061386
31219	cafe-3-chicken-fried-steak-with-gravy	trans_fat	0
31220	cafe-3-chicken-fried-steak-with-gravy	cholesterol	0.2769130665570795
31221	cafe-3-chicken-fried-steak-with-gravy	sodium	6.302905772161435
31222	cafe-3-chicken-fried-steak-with-gravy	carbohydrates	0.1647232067944042
31223	cafe-3-chicken-fried-steak-with-gravy	fiber	0.003904042738994195
31224	cafe-3-chicken-fried-steak-with-gravy	sugar	0.0100683207479324
31225	cafe-3-chicken-fried-steak-with-gravy	protein	0.1649286827280355
31226	cafe-3-chicken-fried-steak-with-gravy	vitamin_a	0
31227	cafe-3-chicken-fried-steak-with-gravy	vitamin_c	0
31228	cafe-3-chicken-fried-steak-with-gravy	calcium	0.4210201880104792
31229	cafe-3-chicken-fried-steak-with-gravy	iron	0.01582164688960806
31230	cafe-3-chicken-fried-steak-with-gravy	water	0
31231	cafe-3-chicken-fried-steak-with-gravy	potassium	2.140579784592729
31232	cafe-3-chicken-fried-steak-with-gravy	vitamin_d	0.00178079142480437
31233	cafe-3-vegan-chicken-patty-smothered-in-gravy	calories	0.8923747276688452
31234	cafe-3-vegan-chicken-patty-smothered-in-gravy	fat	0.03278348376387592
31235	cafe-3-vegan-chicken-patty-smothered-in-gravy	saturated_fat	0.004232804232804232
31236	cafe-3-vegan-chicken-patty-smothered-in-gravy	trans_fat	0
31237	cafe-3-vegan-chicken-patty-smothered-in-gravy	cholesterol	0
31238	cafe-3-vegan-chicken-patty-smothered-in-gravy	sodium	3.067953107168793
31239	cafe-3-vegan-chicken-patty-smothered-in-gravy	carbohydrates	0.04656084656084656
31240	cafe-3-vegan-chicken-patty-smothered-in-gravy	fiber	0.002489884842826019
31241	cafe-3-vegan-chicken-patty-smothered-in-gravy	sugar	0.01220043572984749
31242	cafe-3-vegan-chicken-patty-smothered-in-gravy	protein	0.09926340906733064
31243	cafe-3-vegan-chicken-patty-smothered-in-gravy	vitamin_a	0.003817823425666563
31244	cafe-3-vegan-chicken-patty-smothered-in-gravy	vitamin_c	0.002904865649963689
31245	cafe-3-vegan-chicken-patty-smothered-in-gravy	calcium	0.2592800082996161
31246	cafe-3-vegan-chicken-patty-smothered-in-gravy	iron	0.01070650482415188
31247	cafe-3-vegan-chicken-patty-smothered-in-gravy	water	0.2709824670608984
31248	cafe-3-vegan-chicken-patty-smothered-in-gravy	potassium	0.4402116402116402
31249	cafe-3-vegan-chicken-patty-smothered-in-gravy	vitamin_d	0
31250	cafe-3-mashed-yukon-potato	calories	1.048349937238826
31251	cafe-3-mashed-yukon-potato	fat	0.05211560767116322
31252	cafe-3-mashed-yukon-potato	saturated_fat	0.02965928891854817
31253	cafe-3-mashed-yukon-potato	trans_fat	0
31254	cafe-3-mashed-yukon-potato	cholesterol	0.147978666497185
31255	cafe-3-mashed-yukon-potato	sodium	4.29487688746948
31256	cafe-3-mashed-yukon-potato	carbohydrates	0.1275349423497572
31257	cafe-3-mashed-yukon-potato	fiber	0.01578297874594171
31258	cafe-3-mashed-yukon-potato	sugar	0.008474082548156622
31259	cafe-3-mashed-yukon-potato	protein	0.02351557907113463
31260	cafe-3-mashed-yukon-potato	vitamin_a	0.0819867486534153
31261	cafe-3-mashed-yukon-potato	vitamin_c	0.0218207625615033
31262	cafe-3-mashed-yukon-potato	calcium	0.4047433677063307
31263	cafe-3-mashed-yukon-potato	iron	0.002754076828150902
31264	cafe-3-mashed-yukon-potato	water	0.0341081822563304
31265	cafe-3-mashed-yukon-potato	potassium	3.368553738924109
31266	cafe-3-mashed-yukon-potato	vitamin_d	0
31267	cafe-3-steamed-broccoli-cauliflower-and-carrots	calories	0.2818411315143341
31268	cafe-3-steamed-broccoli-cauliflower-and-carrots	fat	0.002766538714251132
31269	cafe-3-steamed-broccoli-cauliflower-and-carrots	saturated_fat	0.0008069071249899136
31270	cafe-3-steamed-broccoli-cauliflower-and-carrots	trans_fat	0
31271	cafe-3-steamed-broccoli-cauliflower-and-carrots	cholesterol	0
31272	cafe-3-steamed-broccoli-cauliflower-and-carrots	sodium	1.144424848128552
31273	cafe-3-steamed-broccoli-cauliflower-and-carrots	carbohydrates	0.05682931608857534
31274	cafe-3-steamed-broccoli-cauliflower-and-carrots	fiber	0.0230544892854261
31275	cafe-3-steamed-broccoli-cauliflower-and-carrots	sugar	0.02328503417828036
31276	cafe-3-steamed-broccoli-cauliflower-and-carrots	protein	0.02074904035688349
31277	cafe-3-steamed-broccoli-cauliflower-and-carrots	vitamin_a	1.441827759910548
31278	cafe-3-steamed-broccoli-cauliflower-and-carrots	vitamin_c	0.5637975354750953
31279	cafe-3-steamed-broccoli-cauliflower-and-carrots	calcium	0.3432813454599947
31280	cafe-3-steamed-broccoli-cauliflower-and-carrots	iron	0.007031619232054961
31281	cafe-3-steamed-broccoli-cauliflower-and-carrots	water	0.9105370543279039
31282	cafe-3-steamed-broccoli-cauliflower-and-carrots	potassium	2.959274244677295
31283	cafe-3-steamed-broccoli-cauliflower-and-carrots	vitamin_d	0
31284	cafe-3-bean-chili	calories	1.306878306878307
31285	cafe-3-bean-chili	fat	0.02861552028218695
31286	cafe-3-bean-chili	saturated_fat	0
31287	cafe-3-bean-chili	trans_fat	0
31288	cafe-3-bean-chili	cholesterol	0
31289	cafe-3-bean-chili	sodium	2.612169312169312
31290	cafe-3-bean-chili	carbohydrates	0.1877865961199295
31291	cafe-3-bean-chili	fiber	0.04898589065255731
31292	cafe-3-bean-chili	sugar	0.02861552028218695
31293	cafe-3-bean-chili	protein	0.05308641975308642
31294	cafe-3-bean-chili	vitamin_a	0
31295	cafe-3-bean-chili	vitamin_c	0
31296	cafe-3-bean-chili	calcium	0.4897707231040564
31297	cafe-3-bean-chili	iron	0.01221340388007055
31298	cafe-3-bean-chili	water	0
31299	cafe-3-bean-chili	potassium	3.142857142857142
31300	cafe-3-bean-chili	vitamin_d	0
31301	cafe-3-pepperoni-pizza-with-pepperoncinis	calories	2.625371015614918
31302	cafe-3-pepperoni-pizza-with-pepperoncinis	fat	0.1283606486858519
31303	cafe-3-pepperoni-pizza-with-pepperoncinis	saturated_fat	0.05841613971695273
31304	cafe-3-pepperoni-pizza-with-pepperoncinis	trans_fat	0
31305	cafe-3-pepperoni-pizza-with-pepperoncinis	cholesterol	0.2885533617240935
31306	cafe-3-pepperoni-pizza-with-pepperoncinis	sodium	7.147416870994107
31307	cafe-3-pepperoni-pizza-with-pepperoncinis	carbohydrates	0.2599045038069429
31308	cafe-3-pepperoni-pizza-with-pepperoncinis	fiber	0.01230266270916677
31309	cafe-3-pepperoni-pizza-with-pepperoncinis	sugar	0.004817825956037339
31310	cafe-3-pepperoni-pizza-with-pepperoncinis	protein	0.1059921710328215
31311	cafe-3-pepperoni-pizza-with-pepperoncinis	vitamin_a	0
31312	cafe-3-pepperoni-pizza-with-pepperoncinis	vitamin_c	0
31313	cafe-3-pepperoni-pizza-with-pepperoncinis	calcium	1.498171807114897
31314	cafe-3-pepperoni-pizza-with-pepperoncinis	iron	0.01729255387791973
31315	cafe-3-pepperoni-pizza-with-pepperoncinis	water	0
31316	cafe-3-pepperoni-pizza-with-pepperoncinis	potassium	2.383189228717684
31317	cafe-3-pepperoni-pizza-with-pepperoncinis	vitamin_d	0
31318	cafe-3-aurora-sauce	calories	1.262664437267612
31319	cafe-3-aurora-sauce	fat	0.1050566129931209
31320	cafe-3-aurora-sauce	saturated_fat	0.05939974193942447
31321	cafe-3-aurora-sauce	trans_fat	0
31322	cafe-3-aurora-sauce	cholesterol	0.3649495712987776
31323	cafe-3-aurora-sauce	sodium	2.569458759934951
31324	cafe-3-aurora-sauce	carbohydrates	0.06443879459752475
31325	cafe-3-aurora-sauce	fiber	0.01221588523175825
31326	cafe-3-aurora-sauce	sugar	0.0001526985653969781
31327	cafe-3-aurora-sauce	protein	0.01236858379715522
31328	cafe-3-aurora-sauce	vitamin_a	0.003053971307939562
31329	cafe-3-aurora-sauce	vitamin_c	0.003664765569527474
31330	cafe-3-aurora-sauce	calcium	0.1401772830344259
31331	cafe-3-aurora-sauce	iron	0.006260641181276101
31332	cafe-3-aurora-sauce	water	0.00397016270032143
31333	cafe-3-aurora-sauce	potassium	2.060972537163013
31334	cafe-3-aurora-sauce	vitamin_d	0
31335	cafe-3-cacciatore-sauce	calories	0.9401332549480699
31336	cafe-3-cacciatore-sauce	fat	0.07422104644326866
31337	cafe-3-cacciatore-sauce	saturated_fat	0.008573388203017833
31338	cafe-3-cacciatore-sauce	trans_fat	0
31339	cafe-3-cacciatore-sauce	cholesterol	0
31340	cafe-3-cacciatore-sauce	sodium	4.907407407407407
31341	cafe-3-cacciatore-sauce	carbohydrates	0.04629629629629629
31342	cafe-3-cacciatore-sauce	fiber	0.01420732902214384
31343	cafe-3-cacciatore-sauce	sugar	0.02669998040368411
31344	cafe-3-cacciatore-sauce	protein	0.008328434254360181
31345	cafe-3-cacciatore-sauce	vitamin_a	0.1352145796590241
31346	cafe-3-cacciatore-sauce	vitamin_c	0.1624044679600235
31347	cafe-3-cacciatore-sauce	calcium	0.2182539682539683
31348	cafe-3-cacciatore-sauce	iron	0.003429355281207133
31349	cafe-3-cacciatore-sauce	water	0.1501567705271409
31350	cafe-3-cacciatore-sauce	potassium	1.543699784440525
31351	cafe-3-cacciatore-sauce	vitamin_d	0
31352	cafe-3-baked-tofu-piccata	calories	1.606889232257964
31353	cafe-3-baked-tofu-piccata	fat	0.08357915437561457
31354	cafe-3-baked-tofu-piccata	saturated_fat	0.006789343072528914
31355	cafe-3-baked-tofu-piccata	trans_fat	0
31356	cafe-3-baked-tofu-piccata	cholesterol	0
31357	cafe-3-baked-tofu-piccata	sodium	1.202572146524949
31358	cafe-3-baked-tofu-piccata	carbohydrates	0.07187339045746127
31359	cafe-3-baked-tofu-piccata	fiber	0.02107037505267594
31360	cafe-3-baked-tofu-piccata	sugar	0.001638806948541462
31361	cafe-3-baked-tofu-piccata	protein	0.141795820261897
31362	cafe-3-baked-tofu-piccata	vitamin_a	0
31363	cafe-3-baked-tofu-piccata	vitamin_c	0.006633266220286869
31364	cafe-3-baked-tofu-piccata	calcium	2.020648967551623
31365	cafe-3-baked-tofu-piccata	iron	0.0007023458350891978
31366	cafe-3-baked-tofu-piccata	water	0.0670350080379579
31367	cafe-3-baked-tofu-piccata	potassium	1.498962088932591
31368	cafe-3-baked-tofu-piccata	vitamin_d	0
31369	cafe-3-rosemary-chicken	calories	1.3573980071442
31370	cafe-3-rosemary-chicken	fat	0.06159410558733739
31371	cafe-3-rosemary-chicken	saturated_fat	0.01262321059275374
31372	cafe-3-rosemary-chicken	trans_fat	0.0001790526325213297
31373	cafe-3-rosemary-chicken	cholesterol	0.8865791099293637
31374	cafe-3-rosemary-chicken	sodium	2.694473540497229
31375	cafe-3-rosemary-chicken	carbohydrates	0.0005371578975639889
31376	cafe-3-rosemary-chicken	fiber	0.0003581052650426593
31377	cafe-3-rosemary-chicken	sugar	0
31378	cafe-3-rosemary-chicken	protein	0.1866623694034862
31379	cafe-3-rosemary-chicken	vitamin_a	0.09883705315177396
31380	cafe-3-rosemary-chicken	vitamin_c	0.0005371578975639889
31381	cafe-3-rosemary-chicken	calcium	0.1084163689916651
31382	cafe-3-rosemary-chicken	iron	0.007788789514677839
31383	cafe-3-rosemary-chicken	water	0.7445008460236886
31384	cafe-3-rosemary-chicken	potassium	2.32687848593094
31385	cafe-3-rosemary-chicken	vitamin_d	0
31386	cafe-3-black-beans	calories	0.9147075401370933
31387	cafe-3-black-beans	fat	0
31388	cafe-3-black-beans	saturated_fat	0
31389	cafe-3-black-beans	trans_fat	0
31390	cafe-3-black-beans	cholesterol	0
31391	cafe-3-black-beans	sodium	6.558882888779797
31392	cafe-3-black-beans	carbohydrates	0.1675666830306005
31393	cafe-3-black-beans	fiber	0.06851033655157367
31394	cafe-3-black-beans	sugar	0.007563773886797942
31395	cafe-3-black-beans	protein	0.06087383406971035
31396	cafe-3-black-beans	vitamin_a	0
31397	cafe-3-black-beans	vitamin_c	0
31398	cafe-3-black-beans	calcium	0.3808796523573156
31399	cafe-3-black-beans	iron	0.08298332696958126
31400	cafe-3-black-beans	water	0
31401	cafe-3-black-beans	potassium	3.961162930235095
31402	cafe-3-black-beans	vitamin_d	0
31403	cafe-3-quinoa	calories	1.646610065214716
31404	cafe-3-quinoa	fat	0.04708584553545794
31405	cafe-3-quinoa	saturated_fat	0.003773430130019277
31406	cafe-3-quinoa	trans_fat	0
31407	cafe-3-quinoa	cholesterol	0
31408	cafe-3-quinoa	sodium	0.8089085763504368
31409	cafe-3-quinoa	carbohydrates	0.2401049997949223
31410	cafe-3-quinoa	fiber	0.02501948238382347
31411	cafe-3-quinoa	sugar	0.003281243591321111
31412	cafe-3-quinoa	protein	0.04971084040851482
31413	cafe-3-quinoa	vitamin_a	0
31414	cafe-3-quinoa	vitamin_c	0
31415	cafe-3-quinoa	calcium	0.1716090398260941
31416	cafe-3-quinoa	iron	0.017718715393134
31417	cafe-3-quinoa	water	0.5954636807349986
31418	cafe-3-quinoa	potassium	2.092531069275255
31419	cafe-3-quinoa	vitamin_d	0
31420	cafe-3-sauteed-corn-pepper-mexicali	calories	1.241713310309237
31421	cafe-3-sauteed-corn-pepper-mexicali	fat	0.04128458576475726
31422	cafe-3-sauteed-corn-pepper-mexicali	saturated_fat	0.006805151499685261
31423	cafe-3-sauteed-corn-pepper-mexicali	trans_fat	0
31424	cafe-3-sauteed-corn-pepper-mexicali	cholesterol	0
31425	cafe-3-sauteed-corn-pepper-mexicali	sodium	1.397211022077046
31426	cafe-3-sauteed-corn-pepper-mexicali	carbohydrates	0.1785218076750767
31427	cafe-3-sauteed-corn-pepper-mexicali	fiber	0.03085002013190652
31428	cafe-3-sauteed-corn-pepper-mexicali	sugar	0.05478146957246636
31429	cafe-3-sauteed-corn-pepper-mexicali	protein	0.02982924740695373
31430	cafe-3-sauteed-corn-pepper-mexicali	vitamin_a	0.0900548381791683
31431	cafe-3-sauteed-corn-pepper-mexicali	vitamin_c	0.1070677169283814
31432	cafe-3-sauteed-corn-pepper-mexicali	calcium	0.00873327775792942
31433	cafe-3-sauteed-corn-pepper-mexicali	iron	0.005217282816425368
31434	cafe-3-sauteed-corn-pepper-mexicali	water	0.09583921695390075
31435	cafe-3-sauteed-corn-pepper-mexicali	potassium	2.025213086306334
31436	cafe-3-sauteed-corn-pepper-mexicali	vitamin_d	0
31437	cafe-3-vegan-midnight-cookie	calories	2.319929453262787
31438	cafe-3-vegan-midnight-cookie	fat	0.1428571428571428
31439	cafe-3-vegan-midnight-cookie	saturated_fat	0.07142857142857142
31440	cafe-3-vegan-midnight-cookie	trans_fat	0
31441	cafe-3-vegan-midnight-cookie	cholesterol	0
31442	cafe-3-vegan-midnight-cookie	sodium	2.071428571428571
31443	cafe-3-vegan-midnight-cookie	carbohydrates	0.535626102292769
31444	cafe-3-vegan-midnight-cookie	fiber	0.03562610229276895
31445	cafe-3-vegan-midnight-cookie	sugar	0
31446	cafe-3-vegan-midnight-cookie	protein	0.03562610229276895
31447	cafe-3-vegan-midnight-cookie	vitamin_a	0
31448	cafe-3-vegan-midnight-cookie	vitamin_c	0
31449	cafe-3-vegan-midnight-cookie	calcium	0.1428571428571428
31450	cafe-3-vegan-midnight-cookie	iron	0.03562610229276895
31451	cafe-3-vegan-midnight-cookie	water	0
31452	cafe-3-vegan-midnight-cookie	potassium	0
31453	cafe-3-vegan-midnight-cookie	vitamin_d	0
31454	clark-kerr-campus-scrambled-eggs	calories	1.64591102674224
31455	clark-kerr-campus-scrambled-eggs	fat	0.1139877306119884
31456	clark-kerr-campus-scrambled-eggs	saturated_fat	0.0334782862348596
31457	clark-kerr-campus-scrambled-eggs	trans_fat	0
31458	clark-kerr-campus-scrambled-eggs	cholesterol	3.640516804214853
31459	clark-kerr-campus-scrambled-eggs	sodium	1.499252796962721
31460	clark-kerr-campus-scrambled-eggs	carbohydrates	0.02082295551337112
31461	clark-kerr-campus-scrambled-eggs	fiber	0
31462	clark-kerr-campus-scrambled-eggs	sugar	0
31463	clark-kerr-campus-scrambled-eggs	protein	0.1249377330802267
31464	clark-kerr-campus-scrambled-eggs	vitamin_a	0
31465	clark-kerr-campus-scrambled-eggs	vitamin_c	0
31466	clark-kerr-campus-scrambled-eggs	calcium	0.6240603865709887
31467	clark-kerr-campus-scrambled-eggs	iron	0.01660451193954162
31468	clark-kerr-campus-scrambled-eggs	water	0
31469	clark-kerr-campus-scrambled-eggs	potassium	1.352145796590241
31470	clark-kerr-campus-scrambled-eggs	vitamin_d	0
31471	clark-kerr-campus-denver-eggs-scramble	calories	1.515683462723961
31472	clark-kerr-campus-denver-eggs-scramble	fat	0.09263379979890883
31473	clark-kerr-campus-denver-eggs-scramble	saturated_fat	0.02629019762976149
31474	clark-kerr-campus-denver-eggs-scramble	trans_fat	0
31475	clark-kerr-campus-denver-eggs-scramble	cholesterol	2.611053421022268
31476	clark-kerr-campus-denver-eggs-scramble	sodium	4.446010318284461
31477	clark-kerr-campus-denver-eggs-scramble	carbohydrates	0.03617992714565923
31478	clark-kerr-campus-denver-eggs-scramble	fiber	0.00280209002950436
31479	clark-kerr-campus-denver-eggs-scramble	sugar	0.005769008884273681
31480	clark-kerr-campus-denver-eggs-scramble	protein	0.1241985198371491
31481	clark-kerr-campus-denver-eggs-scramble	vitamin_a	0.06453048509123274
31482	clark-kerr-campus-denver-eggs-scramble	vitamin_c	0.0769750613987374
31483	clark-kerr-campus-denver-eggs-scramble	calcium	0.4541858280176037
31484	clark-kerr-campus-denver-eggs-scramble	iron	0.01376320690962435
31485	clark-kerr-campus-denver-eggs-scramble	water	0.06889844896075424
31486	clark-kerr-campus-denver-eggs-scramble	potassium	1.189404803111968
31487	clark-kerr-campus-denver-eggs-scramble	vitamin_d	0
31488	clark-kerr-campus-baked-pork-bacon	calories	15.55882160820432
31489	clark-kerr-campus-baked-pork-bacon	fat	1.384153112548174
31490	clark-kerr-campus-baked-pork-bacon	saturated_fat	0.4324253706969756
31491	clark-kerr-campus-baked-pork-bacon	trans_fat	0
31492	clark-kerr-campus-baked-pork-bacon	cholesterol	2.595205434711607
31493	clark-kerr-campus-baked-pork-bacon	sodium	53.63250375596053
31494	clark-kerr-campus-baked-pork-bacon	carbohydrates	0
31495	clark-kerr-campus-baked-pork-bacon	fiber	0
31496	clark-kerr-campus-baked-pork-bacon	sugar	0
31497	clark-kerr-campus-baked-pork-bacon	protein	1.037951531778692
31498	clark-kerr-campus-baked-pork-bacon	vitamin_a	0
31499	clark-kerr-campus-baked-pork-bacon	vitamin_c	0
31500	clark-kerr-campus-baked-pork-bacon	calcium	0
31501	clark-kerr-campus-baked-pork-bacon	iron	0
31502	clark-kerr-campus-baked-pork-bacon	water	0
31503	clark-kerr-campus-baked-pork-bacon	potassium	16.43543013913384
31504	clark-kerr-campus-baked-pork-bacon	vitamin_d	0
31505	clark-kerr-campus-poblano-fries	calories	1.205783501380985
31506	clark-kerr-campus-poblano-fries	fat	0.07171142391268176
31507	clark-kerr-campus-poblano-fries	saturated_fat	0.006572160660210974
31508	clark-kerr-campus-poblano-fries	trans_fat	0
31509	clark-kerr-campus-poblano-fries	cholesterol	0
31510	clark-kerr-campus-poblano-fries	sodium	0.9701840204984858
31511	clark-kerr-campus-poblano-fries	carbohydrates	0.1245382849156434
31512	clark-kerr-campus-poblano-fries	fiber	0.01539050281188646
31513	clark-kerr-campus-poblano-fries	sugar	0.01497454327643007
31514	clark-kerr-campus-poblano-fries	protein	0.01497454327643007
31515	clark-kerr-campus-poblano-fries	vitamin_a	0.09999667232371633
31516	clark-kerr-campus-poblano-fries	vitamin_c	0.1479984027153838
31517	clark-kerr-campus-poblano-fries	calcium	0.09600346078333498
31518	clark-kerr-campus-poblano-fries	iron	0.005823433496389471
31519	clark-kerr-campus-poblano-fries	water	0.6999767062660144
31520	clark-kerr-campus-poblano-fries	potassium	3.483577917540182
31521	clark-kerr-campus-poblano-fries	vitamin_d	0
31522	clark-kerr-campus-cheesy-shrimp-grits	calories	1.013571491112862
31523	clark-kerr-campus-cheesy-shrimp-grits	fat	0.04628066093787134
31524	clark-kerr-campus-cheesy-shrimp-grits	saturated_fat	0.01851226437514854
31525	clark-kerr-campus-cheesy-shrimp-grits	trans_fat	0
31526	clark-kerr-campus-cheesy-shrimp-grits	cholesterol	0.3763993645790336
31527	clark-kerr-campus-cheesy-shrimp-grits	sodium	4.249515303888826
31528	clark-kerr-campus-cheesy-shrimp-grits	carbohydrates	0.09561334384029418
31529	clark-kerr-campus-cheesy-shrimp-grits	fiber	0.007104706868300248
31530	clark-kerr-campus-cheesy-shrimp-grits	sugar	0.003102055111511376
31531	clark-kerr-campus-cheesy-shrimp-grits	protein	0.05478629592104769
31532	clark-kerr-campus-cheesy-shrimp-grits	vitamin_a	0.03432273881446458
31533	clark-kerr-campus-cheesy-shrimp-grits	vitamin_c	0.04718125758314883
31534	clark-kerr-campus-cheesy-shrimp-grits	calcium	0.6000975646365717
31535	clark-kerr-campus-cheesy-shrimp-grits	iron	0.005703778753424143
31536	clark-kerr-campus-cheesy-shrimp-grits	water	0.5084868725530663
31537	clark-kerr-campus-cheesy-shrimp-grits	potassium	0.6542834627941012
31538	clark-kerr-campus-cheesy-shrimp-grits	vitamin_d	0.0004002651756788873
31539	clark-kerr-campus-brown-rice	calories	1.200793650793651
31540	clark-kerr-campus-brown-rice	fat	0
31541	clark-kerr-campus-brown-rice	saturated_fat	0
31542	clark-kerr-campus-brown-rice	trans_fat	0
31543	clark-kerr-campus-brown-rice	cholesterol	0
31544	clark-kerr-campus-brown-rice	sodium	0
31545	clark-kerr-campus-brown-rice	carbohydrates	0.2743386243386243
31546	clark-kerr-campus-brown-rice	fiber	0.008641975308641974
31547	clark-kerr-campus-brown-rice	sugar	0
31548	clark-kerr-campus-brown-rice	protein	0.02566137566137566
31549	clark-kerr-campus-brown-rice	vitamin_a	0
31550	clark-kerr-campus-brown-rice	vitamin_c	0
31551	clark-kerr-campus-brown-rice	calcium	0
31552	clark-kerr-campus-brown-rice	iron	0
31553	clark-kerr-campus-brown-rice	water	0.6399470899470898
31554	clark-kerr-campus-brown-rice	potassium	0.8571428571428571
31555	clark-kerr-campus-brown-rice	vitamin_d	0
31556	clark-kerr-campus-seared-tofu-soyrizo	calories	2.266925105208934
31557	clark-kerr-campus-seared-tofu-soyrizo	fat	0.1169958265667837
31558	clark-kerr-campus-seared-tofu-soyrizo	saturated_fat	0.01117572074667784
31559	clark-kerr-campus-seared-tofu-soyrizo	trans_fat	0
31560	clark-kerr-campus-seared-tofu-soyrizo	cholesterol	0
31561	clark-kerr-campus-seared-tofu-soyrizo	sodium	4.315574414584315
31562	clark-kerr-campus-seared-tofu-soyrizo	carbohydrates	0.1677522249579455
31563	clark-kerr-campus-seared-tofu-soyrizo	fiber	0.04563419304893453
31564	clark-kerr-campus-seared-tofu-soyrizo	sugar	0.01292192711334626
31565	clark-kerr-campus-seared-tofu-soyrizo	protein	0.1332937526556889
31566	clark-kerr-campus-seared-tofu-soyrizo	vitamin_a	0.08533128445119643
31567	clark-kerr-campus-seared-tofu-soyrizo	vitamin_c	0.09173404112898062
31568	clark-kerr-campus-seared-tofu-soyrizo	calcium	1.297314916676853
31569	clark-kerr-campus-seared-tofu-soyrizo	iron	0.01583227105779361
31570	clark-kerr-campus-seared-tofu-soyrizo	water	0.1658896048334992
31571	clark-kerr-campus-seared-tofu-soyrizo	potassium	1.87682260289521
31572	clark-kerr-campus-seared-tofu-soyrizo	vitamin_d	0
32287	crossroads-oatmeal	calories	0.5525963803368725
31573	clark-kerr-campus-grilled-balsamic-brussels-sprouts	calories	0.5051517683096631
31574	clark-kerr-campus-grilled-balsamic-brussels-sprouts	fat	0.009560939385500788
31575	clark-kerr-campus-grilled-balsamic-brussels-sprouts	saturated_fat	0.001299545159194282
31576	clark-kerr-campus-grilled-balsamic-brussels-sprouts	trans_fat	0
31577	clark-kerr-campus-grilled-balsamic-brussels-sprouts	cholesterol	0
31578	clark-kerr-campus-grilled-balsamic-brussels-sprouts	sodium	1.201986447600483
31579	clark-kerr-campus-grilled-balsamic-brussels-sprouts	carbohydrates	0.1317181843497633
31580	clark-kerr-campus-grilled-balsamic-brussels-sprouts	fiber	0.03378817413905133
31581	clark-kerr-campus-grilled-balsamic-brussels-sprouts	sugar	0.02617655249234196
31582	clark-kerr-campus-grilled-balsamic-brussels-sprouts	protein	0.02988953866146849
31583	clark-kerr-campus-grilled-balsamic-brussels-sprouts	vitamin_a	0.3203378817413905
31584	clark-kerr-campus-grilled-balsamic-brussels-sprouts	vitamin_c	0.7164206813329621
31585	clark-kerr-campus-grilled-balsamic-brussels-sprouts	calcium	0.3835514712707696
31586	clark-kerr-campus-grilled-balsamic-brussels-sprouts	iron	0.01188155574120487
31587	clark-kerr-campus-grilled-balsamic-brussels-sprouts	water	0.7247749002134967
31588	clark-kerr-campus-grilled-balsamic-brussels-sprouts	potassium	3.426157987561496
31589	clark-kerr-campus-grilled-balsamic-brussels-sprouts	vitamin_d	0
31590	clark-kerr-campus-oatmeal	calories	0.5525963803368725
31591	clark-kerr-campus-oatmeal	fat	0.008699975142928163
31592	clark-kerr-campus-oatmeal	saturated_fat	0.001479587609341524
31593	clark-kerr-campus-oatmeal	trans_fat	0
31594	clark-kerr-campus-oatmeal	cholesterol	0
31595	clark-kerr-campus-oatmeal	sodium	1.162364025898702
31596	clark-kerr-campus-oatmeal	carbohydrates	0.09587727708533077
31597	clark-kerr-campus-oatmeal	fiber	0.01449995857154694
31598	clark-kerr-campus-oatmeal	sugar	0
31599	clark-kerr-campus-oatmeal	protein	0.01739995028585633
31600	clark-kerr-campus-oatmeal	vitamin_a	0
31601	clark-kerr-campus-oatmeal	vitamin_c	0
31602	clark-kerr-campus-oatmeal	calcium	0.04071825100907874
31603	clark-kerr-campus-oatmeal	iron	0.005799983428618775
31604	clark-kerr-campus-oatmeal	water	0.8584567309399523
31605	clark-kerr-campus-oatmeal	potassium	0.5231821786631631
31606	clark-kerr-campus-oatmeal	vitamin_d	0
31607	clark-kerr-campus-mini-assorted-danish	calories	3.515767195767196
31608	clark-kerr-campus-mini-assorted-danish	fat	0.1890652557319224
31609	clark-kerr-campus-mini-assorted-danish	saturated_fat	0.0945326278659612
31610	clark-kerr-campus-mini-assorted-danish	trans_fat	0
31611	clark-kerr-campus-mini-assorted-danish	cholesterol	0.2703350970017637
31612	clark-kerr-campus-mini-assorted-danish	sodium	4.05389770723104
31613	clark-kerr-campus-mini-assorted-danish	carbohydrates	0.3781305114638448
31614	clark-kerr-campus-mini-assorted-danish	fiber	0
31615	clark-kerr-campus-mini-assorted-danish	sugar	0.1351675485008818
31616	clark-kerr-campus-mini-assorted-danish	protein	0.05417989417989418
31617	clark-kerr-campus-mini-assorted-danish	vitamin_a	0
31618	clark-kerr-campus-mini-assorted-danish	vitamin_c	0
31619	clark-kerr-campus-mini-assorted-danish	calcium	0.2161552028218695
31620	clark-kerr-campus-mini-assorted-danish	iron	0
31621	clark-kerr-campus-mini-assorted-danish	water	0
31622	clark-kerr-campus-mini-assorted-danish	potassium	0.2703350970017637
31623	clark-kerr-campus-mini-assorted-danish	vitamin_d	0
31624	clark-kerr-campus-mini-butter-croissant	calories	3.463452870860278
31625	clark-kerr-campus-mini-butter-croissant	fat	0.1732314324906917
31626	clark-kerr-campus-mini-butter-croissant	saturated_fat	0.09602194787379972
31627	clark-kerr-campus-mini-butter-croissant	trans_fat	0
31628	clark-kerr-campus-mini-butter-croissant	cholesterol	0.3844797178130511
31629	clark-kerr-campus-mini-butter-croissant	sodium	3.461493239271017
31630	clark-kerr-campus-mini-butter-croissant	carbohydrates	0.4232804232804233
31631	clark-kerr-campus-mini-butter-croissant	fiber	0
31632	clark-kerr-campus-mini-butter-croissant	sugar	0.03840877914951989
31633	clark-kerr-campus-mini-butter-croissant	protein	0.03840877914951989
31634	clark-kerr-campus-mini-butter-croissant	vitamin_a	0
31635	clark-kerr-campus-mini-butter-croissant	vitamin_c	0
31636	clark-kerr-campus-mini-butter-croissant	calcium	0
31637	clark-kerr-campus-mini-butter-croissant	iron	0.007838526357044876
31638	clark-kerr-campus-mini-butter-croissant	water	0
31639	clark-kerr-campus-mini-butter-croissant	potassium	0.3844797178130511
31640	clark-kerr-campus-mini-butter-croissant	vitamin_d	0
31641	clark-kerr-campus-steamed-corn-cob	calories	0.9374143637091844
31642	clark-kerr-campus-steamed-corn-cob	fat	0.005902316659288771
31643	clark-kerr-campus-steamed-corn-cob	saturated_fat	0
31644	clark-kerr-campus-steamed-corn-cob	trans_fat	0
31645	clark-kerr-campus-steamed-corn-cob	cholesterol	0
31646	clark-kerr-campus-steamed-corn-cob	sodium	2.760035694962654
31647	clark-kerr-campus-steamed-corn-cob	carbohydrates	0.2341954931596366
31648	clark-kerr-campus-steamed-corn-cob	fiber	0.02339846961360906
31649	clark-kerr-campus-steamed-corn-cob	sugar	0.05853130687128031
31650	clark-kerr-campus-steamed-corn-cob	protein	0.03513283725767126
31651	clark-kerr-campus-steamed-corn-cob	vitamin_a	0
31652	clark-kerr-campus-steamed-corn-cob	vitamin_c	0
31653	clark-kerr-campus-steamed-corn-cob	calcium	0.03513283725767126
31654	clark-kerr-campus-steamed-corn-cob	iron	0.0117343676440622
31655	clark-kerr-campus-steamed-corn-cob	water	0
31656	clark-kerr-campus-steamed-corn-cob	potassium	2.927338265983685
31657	clark-kerr-campus-steamed-corn-cob	vitamin_d	0
31658	clark-kerr-campus-roasted-garlic-fries	calories	1.029478458049887
31659	clark-kerr-campus-roasted-garlic-fries	fat	0.03964054757705551
31660	clark-kerr-campus-roasted-garlic-fries	saturated_fat	0.004787100025195262
31661	clark-kerr-campus-roasted-garlic-fries	trans_fat	0
32288	crossroads-oatmeal	fat	0.008699975142928163
31662	clark-kerr-campus-roasted-garlic-fries	cholesterol	0
31663	clark-kerr-campus-roasted-garlic-fries	sodium	0.9983203157806333
31664	clark-kerr-campus-roasted-garlic-fries	carbohydrates	0.1525153271185017
31665	clark-kerr-campus-roasted-garlic-fries	fiber	0.01629293692785756
31666	clark-kerr-campus-roasted-garlic-fries	sugar	0.01226169480137734
31667	clark-kerr-campus-roasted-garlic-fries	protein	0.01822457378012933
31668	clark-kerr-campus-roasted-garlic-fries	vitamin_a	0
31669	clark-kerr-campus-roasted-garlic-fries	vitamin_c	0.0828084320147812
31670	clark-kerr-campus-roasted-garlic-fries	calcium	0.1015369110607206
31671	clark-kerr-campus-roasted-garlic-fries	iron	0.007138657932308725
31672	clark-kerr-campus-roasted-garlic-fries	water	0.7731586461745191
31673	clark-kerr-campus-roasted-garlic-fries	potassium	4.35164189132443
31674	clark-kerr-campus-roasted-garlic-fries	vitamin_d	0
31675	clark-kerr-campus-romesco-sauce	calories	1.639579339109855
31676	clark-kerr-campus-romesco-sauce	fat	0.1599947609337281
31677	clark-kerr-campus-romesco-sauce	saturated_fat	0.02289833275748769
31678	clark-kerr-campus-romesco-sauce	trans_fat	0
31679	clark-kerr-campus-romesco-sauce	cholesterol	0
31680	clark-kerr-campus-romesco-sauce	sodium	4.506229294961689
31681	clark-kerr-campus-romesco-sauce	carbohydrates	0.05029051977408785
31682	clark-kerr-campus-romesco-sauce	fiber	0.01391062423926274
31683	clark-kerr-campus-romesco-sauce	sugar	0.02829547430486398
31684	clark-kerr-campus-romesco-sauce	protein	0.007700524132449016
31685	clark-kerr-campus-romesco-sauce	vitamin_a	0
31686	clark-kerr-campus-romesco-sauce	vitamin_c	0.003997046250567377
31687	clark-kerr-campus-romesco-sauce	calcium	0.2456038136789311
31688	clark-kerr-campus-romesco-sauce	iron	0.004403525530286094
31689	clark-kerr-campus-romesco-sauce	water	0.007406955763763275
31690	clark-kerr-campus-romesco-sauce	potassium	1.320583433259489
31691	clark-kerr-campus-romesco-sauce	vitamin_d	0
31692	clark-kerr-campus-roasted-turkey-breast	calories	1.037385532267597
31693	clark-kerr-campus-roasted-turkey-breast	fat	0.05458188813774038
31694	clark-kerr-campus-roasted-turkey-breast	saturated_fat	0.01229152096975862
31695	clark-kerr-campus-roasted-turkey-breast	trans_fat	0
31696	clark-kerr-campus-roasted-turkey-breast	cholesterol	0.3469882241577836
31697	clark-kerr-campus-roasted-turkey-breast	sodium	9.629017408278646
31698	clark-kerr-campus-roasted-turkey-breast	carbohydrates	0.01021938716642766
31699	clark-kerr-campus-roasted-turkey-breast	fiber	0.001883758003028141
31700	clark-kerr-campus-roasted-turkey-breast	sugar	0.004379737357040427
31701	clark-kerr-campus-roasted-turkey-breast	protein	0.1181116267898644
31702	clark-kerr-campus-roasted-turkey-breast	vitamin_a	0.03532046255677764
31703	clark-kerr-campus-roasted-turkey-breast	vitamin_c	0.01361015157187832
31704	clark-kerr-campus-roasted-turkey-breast	calcium	0.1652997647657194
31705	clark-kerr-campus-roasted-turkey-breast	iron	0.008100159413021005
31706	clark-kerr-campus-roasted-turkey-breast	water	0.783266577659101
31707	clark-kerr-campus-roasted-turkey-breast	potassium	1.574492032880996
31708	clark-kerr-campus-roasted-turkey-breast	vitamin_d	0
31709	clark-kerr-campus-baked-tofu-piccata	calories	1.606889232257964
31710	clark-kerr-campus-baked-tofu-piccata	fat	0.08357915437561457
31711	clark-kerr-campus-baked-tofu-piccata	saturated_fat	0.006789343072528914
31712	clark-kerr-campus-baked-tofu-piccata	trans_fat	0
31713	clark-kerr-campus-baked-tofu-piccata	cholesterol	0
31714	clark-kerr-campus-baked-tofu-piccata	sodium	1.202572146524949
31715	clark-kerr-campus-baked-tofu-piccata	carbohydrates	0.07187339045746127
31716	clark-kerr-campus-baked-tofu-piccata	fiber	0.02107037505267594
31717	clark-kerr-campus-baked-tofu-piccata	sugar	0.001638806948541462
31718	clark-kerr-campus-baked-tofu-piccata	protein	0.141795820261897
31719	clark-kerr-campus-baked-tofu-piccata	vitamin_a	0
31720	clark-kerr-campus-baked-tofu-piccata	vitamin_c	0.006633266220286869
31721	clark-kerr-campus-baked-tofu-piccata	calcium	2.020648967551623
31722	clark-kerr-campus-baked-tofu-piccata	iron	0.0007023458350891978
31723	clark-kerr-campus-baked-tofu-piccata	water	0.0670350080379579
31724	clark-kerr-campus-baked-tofu-piccata	potassium	1.498962088932591
31725	clark-kerr-campus-baked-tofu-piccata	vitamin_d	0
31726	clark-kerr-campus-steamed-peas-and-carrots	calories	0.5886243386243386
31727	clark-kerr-campus-steamed-peas-and-carrots	fat	0
31728	clark-kerr-campus-steamed-peas-and-carrots	saturated_fat	0
31729	clark-kerr-campus-steamed-peas-and-carrots	trans_fat	0
31730	clark-kerr-campus-steamed-peas-and-carrots	cholesterol	0
31731	clark-kerr-campus-steamed-peas-and-carrots	sodium	0.2
31732	clark-kerr-campus-steamed-peas-and-carrots	carbohydrates	0.09999999999999999
31733	clark-kerr-campus-steamed-peas-and-carrots	fiber	0.02998236331569665
31734	clark-kerr-campus-steamed-peas-and-carrots	sugar	0.04603174603174603
31735	clark-kerr-campus-steamed-peas-and-carrots	protein	0.02998236331569665
31736	clark-kerr-campus-steamed-peas-and-carrots	vitamin_a	0
31737	clark-kerr-campus-steamed-peas-and-carrots	vitamin_c	0
31738	clark-kerr-campus-steamed-peas-and-carrots	calcium	0.1599647266313933
31739	clark-kerr-campus-steamed-peas-and-carrots	iron	0.009964726631393297
31740	clark-kerr-campus-steamed-peas-and-carrots	water	0
31741	clark-kerr-campus-steamed-peas-and-carrots	potassium	0.7
31742	clark-kerr-campus-steamed-peas-and-carrots	vitamin_d	0
31743	clark-kerr-campus-charbroiled-cabbage	calories	0.4273193586170685
31744	clark-kerr-campus-charbroiled-cabbage	fat	0.02109221786914747
31745	clark-kerr-campus-charbroiled-cabbage	saturated_fat	0.003231148269316207
31746	clark-kerr-campus-charbroiled-cabbage	trans_fat	0
31747	clark-kerr-campus-charbroiled-cabbage	cholesterol	0
31748	clark-kerr-campus-charbroiled-cabbage	sodium	1.939496748657054
31749	clark-kerr-campus-charbroiled-cabbage	carbohydrates	0.05672460295021788
31750	clark-kerr-campus-charbroiled-cabbage	fiber	0.02441312025705579
31751	clark-kerr-campus-charbroiled-cabbage	sugar	0.0313241873886488
31752	clark-kerr-campus-charbroiled-cabbage	protein	0.01247582248430425
31753	clark-kerr-campus-charbroiled-cabbage	vitamin_a	0.04882624051411159
31754	clark-kerr-campus-charbroiled-cabbage	vitamin_c	0.3574906543524015
31755	clark-kerr-campus-charbroiled-cabbage	calcium	0.3907894323500769
31756	clark-kerr-campus-charbroiled-cabbage	iron	0.004577460048197961
31757	clark-kerr-campus-charbroiled-cabbage	water	0.9005030718347088
31758	clark-kerr-campus-charbroiled-cabbage	potassium	1.660630702191347
31759	clark-kerr-campus-charbroiled-cabbage	vitamin_d	0
31760	clark-kerr-campus-chicago-hot-dog	calories	0.6877917547527553
31761	clark-kerr-campus-chicago-hot-dog	fat	0.01479456961429
31762	clark-kerr-campus-chicago-hot-dog	saturated_fat	0.001090126182105579
31763	clark-kerr-campus-chicago-hot-dog	trans_fat	0
31764	clark-kerr-campus-chicago-hot-dog	cholesterol	0
31765	clark-kerr-campus-chicago-hot-dog	sodium	5.371908226948697
31766	clark-kerr-campus-chicago-hot-dog	carbohydrates	0.1217826677723661
31767	clark-kerr-campus-chicago-hot-dog	fiber	0.009305005625829761
31768	clark-kerr-campus-chicago-hot-dog	sugar	0.02799288303335397
31769	clark-kerr-campus-chicago-hot-dog	protein	0.01989480282342681
31770	clark-kerr-campus-chicago-hot-dog	vitamin_a	0.08830022075055187
31771	clark-kerr-campus-chicago-hot-dog	vitamin_c	0.02881047766993315
31772	clark-kerr-campus-chicago-hot-dog	calcium	0.2258897181634488
31773	clark-kerr-campus-chicago-hot-dog	iron	0.004788768585678078
31774	clark-kerr-campus-chicago-hot-dog	water	0.198597630532877
31775	clark-kerr-campus-chicago-hot-dog	potassium	0.566982413928698
31776	clark-kerr-campus-chicago-hot-dog	vitamin_d	0
31777	clark-kerr-campus-vegan-chicago-hot-dog	calories	1.465782894354323
31778	clark-kerr-campus-vegan-chicago-hot-dog	fat	0.05380157761110142
31779	clark-kerr-campus-vegan-chicago-hot-dog	saturated_fat	0.01081458224315367
31780	clark-kerr-campus-vegan-chicago-hot-dog	trans_fat	0
31781	clark-kerr-campus-vegan-chicago-hot-dog	cholesterol	0
31782	clark-kerr-campus-vegan-chicago-hot-dog	sodium	8.845165416593987
31783	clark-kerr-campus-vegan-chicago-hot-dog	carbohydrates	0.1407058549915693
31784	clark-kerr-campus-vegan-chicago-hot-dog	fiber	0.0170164932069694
31785	clark-kerr-campus-vegan-chicago-hot-dog	sugar	0.03569974998546428
31786	clark-kerr-campus-vegan-chicago-hot-dog	protein	0.1017113398065779
31787	clark-kerr-campus-vegan-chicago-hot-dog	vitamin_a	0.0879120879120879
31788	clark-kerr-campus-vegan-chicago-hot-dog	vitamin_c	0.02868383820764774
31789	clark-kerr-campus-vegan-chicago-hot-dog	calcium	0.303002112525922
31790	clark-kerr-campus-vegan-chicago-hot-dog	iron	0.01531096769192007
31791	clark-kerr-campus-vegan-chicago-hot-dog	water	0.1978021978021978
31792	clark-kerr-campus-vegan-chicago-hot-dog	potassium	0.5644901835378027
31793	clark-kerr-campus-vegan-chicago-hot-dog	vitamin_d	0
31794	clark-kerr-campus-housemade-potato-chips	calories	2.606355323118329
31795	clark-kerr-campus-housemade-potato-chips	fat	0.1928821196643933
31796	clark-kerr-campus-housemade-potato-chips	saturated_fat	0.01162186133284399
31797	clark-kerr-campus-housemade-potato-chips	trans_fat	0
31798	clark-kerr-campus-housemade-potato-chips	cholesterol	0
31799	clark-kerr-campus-housemade-potato-chips	sodium	3.011693223639274
31800	clark-kerr-campus-housemade-potato-chips	carbohydrates	0.1883964889745236
31801	clark-kerr-campus-housemade-potato-chips	fiber	0.009990722900164133
31802	clark-kerr-campus-housemade-potato-chips	sugar	0
31803	clark-kerr-campus-housemade-potato-chips	protein	0.01977755349624328
31804	clark-kerr-campus-housemade-potato-chips	vitamin_a	0
31805	clark-kerr-campus-housemade-potato-chips	vitamin_c	0
31806	clark-kerr-campus-housemade-potato-chips	calcium	0
31807	clark-kerr-campus-housemade-potato-chips	iron	0.005097307602124558
31808	clark-kerr-campus-housemade-potato-chips	water	0
31809	clark-kerr-campus-housemade-potato-chips	potassium	2.675474814203138
31810	clark-kerr-campus-housemade-potato-chips	vitamin_d	0
31811	clark-kerr-campus-cheese-pizza	calories	2.501505570611262
31812	clark-kerr-campus-cheese-pizza	fat	0.08925882909622747
31813	clark-kerr-campus-cheese-pizza	saturated_fat	0.04764055577063707
31814	clark-kerr-campus-cheese-pizza	trans_fat	0
31815	clark-kerr-campus-cheese-pizza	cholesterol	0.2083064481438465
31816	clark-kerr-campus-cheese-pizza	sodium	3.928571428571429
31817	clark-kerr-campus-cheese-pizza	carbohydrates	0.3214393255043662
31818	clark-kerr-campus-cheese-pizza	fiber	0.01193702413214608
31819	clark-kerr-campus-cheese-pizza	sugar	0.006022282445046673
31820	clark-kerr-campus-cheese-pizza	protein	0.107110594915473
31821	clark-kerr-campus-cheese-pizza	vitamin_a	0
31822	clark-kerr-campus-cheese-pizza	vitamin_c	0
31823	clark-kerr-campus-cheese-pizza	calcium	1.785714285714286
31824	clark-kerr-campus-cheese-pizza	iron	0.01957241794640169
31825	clark-kerr-campus-cheese-pizza	water	0
31826	clark-kerr-campus-cheese-pizza	potassium	2.85703531638491
31827	clark-kerr-campus-cheese-pizza	vitamin_d	0
31828	clark-kerr-campus-hawaiian-pizza	calories	2.113777121529059
31829	clark-kerr-campus-hawaiian-pizza	fat	0.0756326647799516
31830	clark-kerr-campus-hawaiian-pizza	saturated_fat	0.03953898527541939
31831	clark-kerr-campus-hawaiian-pizza	trans_fat	0
31832	clark-kerr-campus-hawaiian-pizza	cholesterol	0.2214019113243919
31833	clark-kerr-campus-hawaiian-pizza	sodium	4.227390180878554
31834	clark-kerr-campus-hawaiian-pizza	carbohydrates	0.2624994873056888
31835	clark-kerr-campus-hawaiian-pizza	fiber	0.01082810385135967
31836	clark-kerr-campus-hawaiian-pizza	sugar	0.01747262212378491
31837	clark-kerr-campus-hawaiian-pizza	protein	0.1012263647922563
31838	clark-kerr-campus-hawaiian-pizza	vitamin_a	0
31839	clark-kerr-campus-hawaiian-pizza	vitamin_c	0
31840	clark-kerr-campus-hawaiian-pizza	calcium	1.380911365407489
31841	clark-kerr-campus-hawaiian-pizza	iron	0.01533981378942619
31842	clark-kerr-campus-hawaiian-pizza	water	0
31843	clark-kerr-campus-hawaiian-pizza	potassium	3.108978302776752
31844	clark-kerr-campus-hawaiian-pizza	vitamin_d	0
31845	clark-kerr-campus-cheese-marinara-ravioli-pasta	calories	1.585499696954805
31846	clark-kerr-campus-cheese-marinara-ravioli-pasta	fat	0.06099125810168121
31847	clark-kerr-campus-cheese-marinara-ravioli-pasta	saturated_fat	0.03461813575332667
31848	clark-kerr-campus-cheese-marinara-ravioli-pasta	trans_fat	0
31849	clark-kerr-campus-cheese-marinara-ravioli-pasta	cholesterol	0.3381001523416384
31850	clark-kerr-campus-cheese-marinara-ravioli-pasta	sodium	3.999432131527075
31851	clark-kerr-campus-cheese-marinara-ravioli-pasta	carbohydrates	0.173418295193321
31852	clark-kerr-campus-cheese-marinara-ravioli-pasta	fiber	0.01359608170753682
31853	clark-kerr-campus-cheese-marinara-ravioli-pasta	sugar	0.008518027093878488
31854	clark-kerr-campus-cheese-marinara-ravioli-pasta	protein	0.0673251756843088
31855	clark-kerr-campus-cheese-marinara-ravioli-pasta	vitamin_a	0
31856	clark-kerr-campus-cheese-marinara-ravioli-pasta	vitamin_c	0
31857	clark-kerr-campus-cheese-marinara-ravioli-pasta	calcium	1.348360006770739
31858	clark-kerr-campus-cheese-marinara-ravioli-pasta	iron	0.01021071196509793
31859	clark-kerr-campus-cheese-marinara-ravioli-pasta	water	0
31860	clark-kerr-campus-cheese-marinara-ravioli-pasta	potassium	1.168170972092541
31861	clark-kerr-campus-cheese-marinara-ravioli-pasta	vitamin_d	0
31862	clark-kerr-campus-gluten-free-penne-pasta	calories	0.9685132371157779
31863	clark-kerr-campus-gluten-free-penne-pasta	fat	0.005121360233277959
31864	clark-kerr-campus-gluten-free-penne-pasta	saturated_fat	0
31865	clark-kerr-campus-gluten-free-penne-pasta	trans_fat	0
31866	clark-kerr-campus-gluten-free-penne-pasta	cholesterol	0
31867	clark-kerr-campus-gluten-free-penne-pasta	sodium	7.548180796819635
31868	clark-kerr-campus-gluten-free-penne-pasta	carbohydrates	0.2241235272088266
31869	clark-kerr-campus-gluten-free-penne-pasta	fiber	0.01017870346363994
31870	clark-kerr-campus-gluten-free-penne-pasta	sugar	0.01037075447238787
31871	clark-kerr-campus-gluten-free-penne-pasta	protein	0.02042142393019586
31872	clark-kerr-campus-gluten-free-penne-pasta	vitamin_a	0
31873	clark-kerr-campus-gluten-free-penne-pasta	vitamin_c	0
31874	clark-kerr-campus-gluten-free-penne-pasta	calcium	0.01017870346363994
31875	clark-kerr-campus-gluten-free-penne-pasta	iron	0
31876	clark-kerr-campus-gluten-free-penne-pasta	water	0.6968890937432982
31877	clark-kerr-campus-gluten-free-penne-pasta	potassium	0.3819894563996197
31878	clark-kerr-campus-gluten-free-penne-pasta	vitamin_d	0
31879	clark-kerr-campus-steamed-broccoli	calories	0.2820032333921223
31880	clark-kerr-campus-steamed-broccoli	fat	0.003490593768371546
31881	clark-kerr-campus-steamed-broccoli	saturated_fat	0.0004592886537330982
31882	clark-kerr-campus-steamed-broccoli	trans_fat	0
31883	clark-kerr-campus-steamed-broccoli	cholesterol	0
31884	clark-kerr-campus-steamed-broccoli	sodium	0.2699698706643151
31885	clark-kerr-campus-steamed-broccoli	carbohydrates	0.05061360964138741
31886	clark-kerr-campus-steamed-broccoli	fiber	0.02296443268665491
31887	clark-kerr-campus-steamed-broccoli	sugar	0.01478909465020576
31888	clark-kerr-campus-steamed-broccoli	protein	0.02976190476190476
31889	clark-kerr-campus-steamed-broccoli	vitamin_a	0
31890	clark-kerr-campus-steamed-broccoli	vitamin_c	0.9319885361552028
31891	clark-kerr-campus-steamed-broccoli	calcium	0.4799566431510876
31892	clark-kerr-campus-steamed-broccoli	iron	0.008818342151675485
31893	clark-kerr-campus-steamed-broccoli	water	0.9069113756613757
31894	clark-kerr-campus-steamed-broccoli	potassium	3.249926513815403
31895	clark-kerr-campus-steamed-broccoli	vitamin_d	0
31896	clark-kerr-campus-baguette-with-herb-oil	calories	3.30765639589169
31897	clark-kerr-campus-baguette-with-herb-oil	fat	0.06069094304388421
31898	clark-kerr-campus-baguette-with-herb-oil	saturated_fat	0.005965349102604003
31899	clark-kerr-campus-baguette-with-herb-oil	trans_fat	0
31900	clark-kerr-campus-baguette-with-herb-oil	cholesterol	0
31901	clark-kerr-campus-baguette-with-herb-oil	sodium	6.603900819587094
31902	clark-kerr-campus-baguette-with-herb-oil	carbohydrates	0.5661894387384582
31903	clark-kerr-campus-baguette-with-herb-oil	fiber	0.01893349932565619
31904	clark-kerr-campus-baguette-with-herb-oil	sugar	0
31905	clark-kerr-campus-baguette-with-herb-oil	protein	0.0754746342981637
31906	clark-kerr-campus-baguette-with-herb-oil	vitamin_a	0.001556178026766262
31907	clark-kerr-campus-baguette-with-herb-oil	vitamin_c	0.0005187260089220873
31908	clark-kerr-campus-baguette-with-herb-oil	calcium	0.1556178026766262
31909	clark-kerr-campus-baguette-with-herb-oil	iron	0.03786699865131237
31910	clark-kerr-campus-baguette-with-herb-oil	water	0.0005187260089220873
31911	clark-kerr-campus-baguette-with-herb-oil	potassium	0.9500466853408029
31912	clark-kerr-campus-baguette-with-herb-oil	vitamin_d	0
31913	clark-kerr-campus-marinara-penne-pasta	calories	1.006581494386372
31914	clark-kerr-campus-marinara-penne-pasta	fat	0.01431269723952651
31915	clark-kerr-campus-marinara-penne-pasta	saturated_fat	0.0007821146032528147
31916	clark-kerr-campus-marinara-penne-pasta	trans_fat	0
31917	clark-kerr-campus-marinara-penne-pasta	cholesterol	0
31918	clark-kerr-campus-marinara-penne-pasta	sodium	3.262121798707164
31919	clark-kerr-campus-marinara-penne-pasta	carbohydrates	0.1927912497018188
31920	clark-kerr-campus-marinara-penne-pasta	fiber	0.01462554308082763
31921	clark-kerr-campus-marinara-penne-pasta	sugar	0.007977568953178709
31922	clark-kerr-campus-marinara-penne-pasta	protein	0.03441304254312384
31923	clark-kerr-campus-marinara-penne-pasta	vitamin_a	0
31924	clark-kerr-campus-marinara-penne-pasta	vitamin_c	0
31925	clark-kerr-campus-marinara-penne-pasta	calcium	0.07062494867372915
31926	clark-kerr-campus-marinara-penne-pasta	iron	0.01048033568358772
31927	clark-kerr-campus-marinara-penne-pasta	water	0.3334154553666749
31928	clark-kerr-campus-marinara-penne-pasta	potassium	1.14220016659041
31929	clark-kerr-campus-marinara-penne-pasta	vitamin_d	0
31930	clark-kerr-campus-turkey-and-bean-chili	calories	1.102689594356261
31931	clark-kerr-campus-turkey-and-bean-chili	fat	0.04488536155202821
31932	clark-kerr-campus-turkey-and-bean-chili	saturated_fat	0.01428571428571429
31933	clark-kerr-campus-turkey-and-bean-chili	trans_fat	0
31934	clark-kerr-campus-turkey-and-bean-chili	cholesterol	0.2041005291005291
31935	clark-kerr-campus-turkey-and-bean-chili	sodium	2.081569664902998
31936	clark-kerr-campus-turkey-and-bean-chili	carbohydrates	0.09391534391534391
31937	clark-kerr-campus-turkey-and-bean-chili	fiber	0.02861552028218695
31938	clark-kerr-campus-turkey-and-bean-chili	sugar	0.02041446208112875
31939	clark-kerr-campus-turkey-and-bean-chili	protein	0.08161375661375661
31940	clark-kerr-campus-turkey-and-bean-chili	vitamin_a	0
31941	clark-kerr-campus-turkey-and-bean-chili	vitamin_c	0
31942	clark-kerr-campus-turkey-and-bean-chili	calcium	0.3101851851851851
31943	clark-kerr-campus-turkey-and-bean-chili	iron	0.01631393298059965
31944	clark-kerr-campus-turkey-and-bean-chili	water	0
31945	clark-kerr-campus-turkey-and-bean-chili	potassium	2.734656084656085
31946	clark-kerr-campus-turkey-and-bean-chili	vitamin_d	0
31947	clark-kerr-campus-tuscan-mushroom-bean-soup	calories	0.660405643738977
31948	clark-kerr-campus-tuscan-mushroom-bean-soup	fat	0.02641093474426808
31949	clark-kerr-campus-tuscan-mushroom-bean-soup	saturated_fat	0.02200176366843034
31950	clark-kerr-campus-tuscan-mushroom-bean-soup	trans_fat	0
31951	clark-kerr-campus-tuscan-mushroom-bean-soup	cholesterol	0
31952	clark-kerr-campus-tuscan-mushroom-bean-soup	sodium	2.729938271604938
31953	clark-kerr-campus-tuscan-mushroom-bean-soup	carbohydrates	0.1940035273368607
31954	clark-kerr-campus-tuscan-mushroom-bean-soup	fiber	0.004409171075837742
31955	clark-kerr-campus-tuscan-mushroom-bean-soup	sugar	0.01318342151675485
31956	clark-kerr-campus-tuscan-mushroom-bean-soup	protein	0.01318342151675485
31957	clark-kerr-campus-tuscan-mushroom-bean-soup	vitamin_a	0
31958	clark-kerr-campus-tuscan-mushroom-bean-soup	vitamin_c	0
31959	clark-kerr-campus-tuscan-mushroom-bean-soup	calcium	0.1937830687830688
31960	clark-kerr-campus-tuscan-mushroom-bean-soup	iron	0.004409171075837742
31961	clark-kerr-campus-tuscan-mushroom-bean-soup	water	0
31962	clark-kerr-campus-tuscan-mushroom-bean-soup	potassium	2.28994708994709
31963	clark-kerr-campus-tuscan-mushroom-bean-soup	vitamin_d	0
31964	clark-kerr-campus-baked-diced-sweet-potato	calories	1.119203236850296
31965	clark-kerr-campus-baked-diced-sweet-potato	fat	0.032057267351385
31966	clark-kerr-campus-baked-diced-sweet-potato	saturated_fat	0.003838572466023446
31967	clark-kerr-campus-baked-diced-sweet-potato	trans_fat	0
31968	clark-kerr-campus-baked-diced-sweet-potato	cholesterol	0
31969	clark-kerr-campus-baked-diced-sweet-potato	sodium	1.549330843448491
31970	clark-kerr-campus-baked-diced-sweet-potato	carbohydrates	0.1940035273368607
31971	clark-kerr-campus-baked-diced-sweet-potato	fiber	0.02894491129785248
31972	clark-kerr-campus-baked-diced-sweet-potato	sugar	0.04025313829235398
31973	clark-kerr-campus-baked-diced-sweet-potato	protein	0.01514679946052495
31974	clark-kerr-campus-baked-diced-sweet-potato	vitamin_a	6.83629007158419
31975	clark-kerr-campus-baked-diced-sweet-potato	vitamin_c	0.0231351799979251
31976	clark-kerr-campus-baked-diced-sweet-potato	calcium	0.2893453677767403
31977	clark-kerr-campus-baked-diced-sweet-potato	iron	0.005913476501711795
31978	clark-kerr-campus-baked-diced-sweet-potato	water	0.7452017844174706
31979	clark-kerr-campus-baked-diced-sweet-potato	potassium	3.249403465089739
31980	clark-kerr-campus-baked-diced-sweet-potato	vitamin_d	0
31981	clark-kerr-campus-black-beans	calories	0.9147075401370933
31982	clark-kerr-campus-black-beans	fat	0
31983	clark-kerr-campus-black-beans	saturated_fat	0
31984	clark-kerr-campus-black-beans	trans_fat	0
31985	clark-kerr-campus-black-beans	cholesterol	0
31986	clark-kerr-campus-black-beans	sodium	6.558882888779797
31987	clark-kerr-campus-black-beans	carbohydrates	0.1675666830306005
31988	clark-kerr-campus-black-beans	fiber	0.06851033655157367
31989	clark-kerr-campus-black-beans	sugar	0.007563773886797942
31990	clark-kerr-campus-black-beans	protein	0.06087383406971035
31991	clark-kerr-campus-black-beans	vitamin_a	0
31992	clark-kerr-campus-black-beans	vitamin_c	0
31993	clark-kerr-campus-black-beans	calcium	0.3808796523573156
31994	clark-kerr-campus-black-beans	iron	0.08298332696958126
31995	clark-kerr-campus-black-beans	water	0
31996	clark-kerr-campus-black-beans	potassium	3.961162930235095
31997	clark-kerr-campus-black-beans	vitamin_d	0
31998	clark-kerr-campus-grilled-eggplant	calories	0.5791150069757035
31999	clark-kerr-campus-grilled-eggplant	fat	0.03939736941395316
32000	clark-kerr-campus-grilled-eggplant	saturated_fat	0.005703405371730414
32001	clark-kerr-campus-grilled-eggplant	trans_fat	0
32002	clark-kerr-campus-grilled-eggplant	cholesterol	0
32003	clark-kerr-campus-grilled-eggplant	sodium	1.745242043749507
32004	clark-kerr-campus-grilled-eggplant	carbohydrates	0.05633209613309116
32005	clark-kerr-campus-grilled-eggplant	fiber	0.02869251625470531
32006	clark-kerr-campus-grilled-eggplant	sugar	0.03369396404222275
32007	clark-kerr-campus-grilled-eggplant	protein	0.009388682688848527
32008	clark-kerr-campus-grilled-eggplant	vitamin_a	0
32009	clark-kerr-campus-grilled-eggplant	vitamin_c	0
32010	clark-kerr-campus-grilled-eggplant	calcium	0.08888537910096783
32011	clark-kerr-campus-grilled-eggplant	iron	0.002281362148692166
32012	clark-kerr-campus-grilled-eggplant	water	0
32013	clark-kerr-campus-grilled-eggplant	potassium	2.199759579527407
32014	clark-kerr-campus-grilled-eggplant	vitamin_d	0
32015	clark-kerr-campus-roasted-peppers	calories	0.4203545217370102
32016	clark-kerr-campus-roasted-peppers	fat	0.02080641097538179
32017	clark-kerr-campus-roasted-peppers	saturated_fat	0.002600801371922724
32018	clark-kerr-campus-roasted-peppers	trans_fat	0
32019	clark-kerr-campus-roasted-peppers	cholesterol	0
32020	clark-kerr-campus-roasted-peppers	sodium	0.8334755646583603
32021	clark-kerr-campus-roasted-peppers	carbohydrates	0.05217857752419964
32022	clark-kerr-campus-roasted-peppers	fiber	0.01861198481782199
32023	clark-kerr-campus-roasted-peppers	sugar	0.03218491697754371
32024	clark-kerr-campus-roasted-peppers	protein	0.009102804801729534
32025	clark-kerr-campus-roasted-peppers	vitamin_a	0
32026	clark-kerr-campus-roasted-peppers	vitamin_c	0
32027	clark-kerr-campus-roasted-peppers	calcium	0.08452604458748852
32028	clark-kerr-campus-roasted-peppers	iron	0.0038199270150115
32029	clark-kerr-campus-roasted-peppers	water	0
32030	clark-kerr-campus-roasted-peppers	potassium	1.896390575346029
32031	clark-kerr-campus-roasted-peppers	vitamin_d	0
32032	clark-kerr-campus-halal-ground-beef	calories	2.580056714043642
32033	clark-kerr-campus-halal-ground-beef	fat	0.2079226752429367
32034	clark-kerr-campus-halal-ground-beef	saturated_fat	0.07357263893211605
32035	clark-kerr-campus-halal-ground-beef	trans_fat	0.01106615485700453
32036	clark-kerr-campus-halal-ground-beef	cholesterol	0.6675139191479059
32037	clark-kerr-campus-halal-ground-beef	sodium	2.337120033198464
32038	clark-kerr-campus-halal-ground-beef	carbohydrates	0.002161358370508697
32039	clark-kerr-campus-halal-ground-beef	fiber	0.001210360687484871
32040	clark-kerr-campus-halal-ground-beef	sugar	0.0002593630044610437
32041	clark-kerr-campus-halal-ground-beef	protein	0.1625341494622541
32042	clark-kerr-campus-halal-ground-beef	vitamin_a	0.03760763564685133
32043	clark-kerr-campus-halal-ground-beef	vitamin_c	0
32044	clark-kerr-campus-halal-ground-beef	calcium	0.2174326520731749
32045	clark-kerr-campus-halal-ground-beef	iron	0.0204032230176021
32046	clark-kerr-campus-halal-ground-beef	water	0.5815783103364802
32047	clark-kerr-campus-halal-ground-beef	potassium	2.731524708648891
32048	clark-kerr-campus-halal-ground-beef	vitamin_d	0.0008645433482034789
32049	clark-kerr-campus-chicken-breast	calories	1.274262198706643
32050	clark-kerr-campus-chicken-breast	fat	0.0364021164021164
32051	clark-kerr-campus-chicken-breast	saturated_fat	0.006678424456202234
32052	clark-kerr-campus-chicken-breast	trans_fat	9.40623162845385e-05
32053	clark-kerr-campus-chicken-breast	cholesterol	0.7156261022927689
32054	clark-kerr-campus-chicken-breast	sodium	2.290605526161082
32055	clark-kerr-campus-chicken-breast	carbohydrates	0.0002821869488536155
32056	clark-kerr-campus-chicken-breast	fiber	0.000188124632569077
32057	clark-kerr-campus-chicken-breast	sugar	0
32058	clark-kerr-campus-chicken-breast	protein	0.2206701940035273
32059	clark-kerr-campus-chicken-breast	vitamin_a	0.08823045267489713
32060	clark-kerr-campus-chicken-breast	vitamin_c	0
32061	clark-kerr-campus-chicken-breast	calcium	0.05606114050558494
32062	clark-kerr-campus-chicken-breast	iron	0.003856554967666078
32063	clark-kerr-campus-chicken-breast	water	0.724373897707231
32064	clark-kerr-campus-chicken-breast	potassium	3.302339800117577
32065	clark-kerr-campus-chicken-breast	vitamin_d	0
32066	clark-kerr-campus-baked-dijon-herb-crusted-salmon	calories	2.155898353081452
32067	clark-kerr-campus-baked-dijon-herb-crusted-salmon	fat	0.1358769903370843
32068	clark-kerr-campus-baked-dijon-herb-crusted-salmon	saturated_fat	0.02881486449561567
32069	clark-kerr-campus-baked-dijon-herb-crusted-salmon	trans_fat	0
32070	clark-kerr-campus-baked-dijon-herb-crusted-salmon	cholesterol	0.4775152975465964
32071	clark-kerr-campus-baked-dijon-herb-crusted-salmon	sodium	1.266777620455242
32072	clark-kerr-campus-baked-dijon-herb-crusted-salmon	carbohydrates	0.01150938553129476
32073	clark-kerr-campus-baked-dijon-herb-crusted-salmon	fiber	0.002070033368937907
32074	clark-kerr-campus-baked-dijon-herb-crusted-salmon	sugar	0.001987232034180391
32075	clark-kerr-campus-baked-dijon-herb-crusted-salmon	protein	0.1824113404708084
32076	clark-kerr-campus-baked-dijon-herb-crusted-salmon	vitamin_a	0.01506984292586797
32077	clark-kerr-campus-baked-dijon-herb-crusted-salmon	vitamin_c	0.0187959029899562
32078	clark-kerr-campus-baked-dijon-herb-crusted-salmon	calcium	0.1539276813142228
32079	clark-kerr-campus-baked-dijon-herb-crusted-salmon	iron	0.004719676081178428
32080	clark-kerr-campus-baked-dijon-herb-crusted-salmon	water	0.03999304468788037
32081	clark-kerr-campus-baked-dijon-herb-crusted-salmon	potassium	3.491980690728735
32082	clark-kerr-campus-baked-dijon-herb-crusted-salmon	vitamin_d	0.09977560838280713
32083	clark-kerr-campus-kosher-spiced-couscous	calories	3.035334184759472
32084	clark-kerr-campus-kosher-spiced-couscous	fat	0.02988679507562923
32085	clark-kerr-campus-kosher-spiced-couscous	saturated_fat	0.003127687856751896
32086	clark-kerr-campus-kosher-spiced-couscous	trans_fat	0
32087	clark-kerr-campus-kosher-spiced-couscous	cholesterol	0
32088	clark-kerr-campus-kosher-spiced-couscous	sodium	2.143248103839237
32089	clark-kerr-campus-kosher-spiced-couscous	carbohydrates	0.5683703877464141
32090	clark-kerr-campus-kosher-spiced-couscous	fiber	0.03883545755466938
32091	clark-kerr-campus-kosher-spiced-couscous	sugar	0.007297938332421092
32092	clark-kerr-campus-kosher-spiced-couscous	protein	0.0951338389762035
32093	clark-kerr-campus-kosher-spiced-couscous	vitamin_a	0
32094	clark-kerr-campus-kosher-spiced-couscous	vitamin_c	0.01277139208173691
32095	clark-kerr-campus-kosher-spiced-couscous	calcium	0.2118139720766979
32096	clark-kerr-campus-kosher-spiced-couscous	iron	0.007471698768907308
32097	clark-kerr-campus-kosher-spiced-couscous	water	0.548214177114013
32098	clark-kerr-campus-kosher-spiced-couscous	potassium	1.471142735510552
32099	clark-kerr-campus-kosher-spiced-couscous	vitamin_d	0
32100	clark-kerr-campus-roasted-asparagus	calories	0.5563311100770384
32101	clark-kerr-campus-roasted-asparagus	fat	0.04032883511710873
32102	clark-kerr-campus-roasted-asparagus	saturated_fat	0.004940569544261184
32103	clark-kerr-campus-roasted-asparagus	trans_fat	0
32104	clark-kerr-campus-roasted-asparagus	cholesterol	0
32105	clark-kerr-campus-roasted-asparagus	sodium	0.7711884367693271
32106	clark-kerr-campus-roasted-asparagus	carbohydrates	0.03768620489575972
32107	clark-kerr-campus-roasted-asparagus	fiber	0.01964738121089913
32108	clark-kerr-campus-roasted-asparagus	sugar	0.01815372065100621
32109	clark-kerr-campus-roasted-asparagus	protein	0.02068145390620961
32110	clark-kerr-campus-roasted-asparagus	vitamin_a	0.3562954920175333
32111	clark-kerr-campus-roasted-asparagus	vitamin_c	0.05974642239571664
32112	clark-kerr-campus-roasted-asparagus	calcium	0.2261172293745584
32113	clark-kerr-campus-roasted-asparagus	iron	0.02010696907548156
32114	clark-kerr-campus-roasted-asparagus	water	0.8910259724591971
32115	clark-kerr-campus-roasted-asparagus	potassium	1.912804692392097
32116	clark-kerr-campus-roasted-asparagus	vitamin_d	0
32117	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	calories	1.179295946321036
32118	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	fat	0.05141015893704066
32119	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	saturated_fat	0.01099922246875652
32120	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	trans_fat	0
32121	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	cholesterol	0
32122	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	sodium	2.600747188560808
32123	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	carbohydrates	0.1275082278666508
32124	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	fiber	0.01868833410052048
32125	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	sugar	0.01320596302675156
32126	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	protein	0.04689323685739456
32127	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	vitamin_a	0
32128	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	vitamin_c	0.0006896064243734494
32129	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	calcium	0.5934063281733531
32130	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	iron	0.004689323685739456
32131	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	water	0.2286045296797985
32132	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	potassium	1.393660103337522
32133	clark-kerr-campus-wild-rice-tofu-stuffed-peppers	vitamin_d	0
32134	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	calories	0.590165177978798
32135	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	fat	0.03356659270637765
32136	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	saturated_fat	0.00398247710075667
32137	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	trans_fat	0
32138	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	cholesterol	0
32139	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	sodium	1.869014431738446
32140	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	carbohydrates	0.06059054446151219
32141	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	fiber	0.01441277426940509
32142	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	sugar	0.02294665377102653
32143	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	protein	0.0194382810870266
32144	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	vitamin_a	0.1064838520035652
32145	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	vitamin_c	0.07718419904799832
32146	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	calcium	0.2620849215831295
32147	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	iron	0.008344237734918738
32148	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	water	0.6789175247956609
32149	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	potassium	2.770381748876372
32150	clark-kerr-campus-roasted-asparagus-mushroom-pepper-and-zucchini	vitamin_d	0.0001896417667026986
32151	crossroads-scrambled-eggs	calories	1.64591102674224
32152	crossroads-scrambled-eggs	fat	0.1139877306119884
32153	crossroads-scrambled-eggs	saturated_fat	0.0334782862348596
32154	crossroads-scrambled-eggs	trans_fat	0
32155	crossroads-scrambled-eggs	cholesterol	3.640516804214853
32156	crossroads-scrambled-eggs	sodium	1.499252796962721
32157	crossroads-scrambled-eggs	carbohydrates	0.02082295551337112
32158	crossroads-scrambled-eggs	fiber	0
32159	crossroads-scrambled-eggs	sugar	0
32160	crossroads-scrambled-eggs	protein	0.1249377330802267
32161	crossroads-scrambled-eggs	vitamin_a	0
32162	crossroads-scrambled-eggs	vitamin_c	0
32163	crossroads-scrambled-eggs	calcium	0.6240603865709887
32164	crossroads-scrambled-eggs	iron	0.01660451193954162
32165	crossroads-scrambled-eggs	water	0
32166	crossroads-scrambled-eggs	potassium	1.352145796590241
32167	crossroads-scrambled-eggs	vitamin_d	0
32168	crossroads-chicken-fried-steak-with-gravy	calories	1.713943254396329
32169	crossroads-chicken-fried-steak-with-gravy	fat	0.04109518672625468
32170	crossroads-chicken-fried-steak-with-gravy	saturated_fat	0.01191760415061386
32171	crossroads-chicken-fried-steak-with-gravy	trans_fat	0
32172	crossroads-chicken-fried-steak-with-gravy	cholesterol	0.2769130665570795
32173	crossroads-chicken-fried-steak-with-gravy	sodium	6.302905772161435
32174	crossroads-chicken-fried-steak-with-gravy	carbohydrates	0.1647232067944042
32175	crossroads-chicken-fried-steak-with-gravy	fiber	0.003904042738994195
32176	crossroads-chicken-fried-steak-with-gravy	sugar	0.0100683207479324
32177	crossroads-chicken-fried-steak-with-gravy	protein	0.1649286827280355
32178	crossroads-chicken-fried-steak-with-gravy	vitamin_a	0
32179	crossroads-chicken-fried-steak-with-gravy	vitamin_c	0
32180	crossroads-chicken-fried-steak-with-gravy	calcium	0.4210201880104792
32181	crossroads-chicken-fried-steak-with-gravy	iron	0.01582164688960806
32182	crossroads-chicken-fried-steak-with-gravy	water	0
32183	crossroads-chicken-fried-steak-with-gravy	potassium	2.140579784592729
32184	crossroads-chicken-fried-steak-with-gravy	vitamin_d	0.00178079142480437
32185	crossroads-turkey-sausage-link	calories	1.965608465608466
32186	crossroads-turkey-sausage-link	fat	0.1428571428571428
32187	crossroads-turkey-sausage-link	saturated_fat	0.03562610229276895
32188	crossroads-turkey-sausage-link	trans_fat	0
32189	crossroads-turkey-sausage-link	cholesterol	0.7142857142857143
32190	crossroads-turkey-sausage-link	sodium	6.964197530864197
32191	crossroads-turkey-sausage-link	carbohydrates	0.01781305114638448
32192	crossroads-turkey-sausage-link	fiber	0
32193	crossroads-turkey-sausage-link	sugar	0
32194	crossroads-turkey-sausage-link	protein	0.1606701940035273
32195	crossroads-turkey-sausage-link	vitamin_a	0
32196	crossroads-turkey-sausage-link	vitamin_c	0
32197	crossroads-turkey-sausage-link	calcium	0.2320987654320988
32198	crossroads-turkey-sausage-link	iron	0.01781305114638448
32199	crossroads-turkey-sausage-link	water	0
32200	crossroads-turkey-sausage-link	potassium	2.5
32201	crossroads-turkey-sausage-link	vitamin_d	0
32202	crossroads-fried-tator-tots	calories	2.150982150982151
32203	crossroads-fried-tator-tots	fat	0.1226334559667893
32204	crossroads-fried-tator-tots	saturated_fat	0.01880668547335214
32205	crossroads-fried-tator-tots	trans_fat	0
32206	crossroads-fried-tator-tots	cholesterol	0
32207	crossroads-fried-tator-tots	sodium	4.211310877977544
32208	crossroads-fried-tator-tots	carbohydrates	0.2223002223002223
32209	crossroads-fried-tator-tots	fiber	0.0117000117000117
32210	crossroads-fried-tator-tots	sugar	0.01144001144001144
32211	crossroads-fried-tator-tots	protein	0.0234000234000234
32212	crossroads-fried-tator-tots	vitamin_a	0
32213	crossroads-fried-tator-tots	vitamin_c	0
32214	crossroads-fried-tator-tots	calcium	0
32215	crossroads-fried-tator-tots	iron	0.005893339226672559
32216	crossroads-fried-tator-tots	water	0
32217	crossroads-fried-tator-tots	potassium	3.041569708236374
32218	crossroads-fried-tator-tots	vitamin_d	0
32219	crossroads-vegan-chicken-patty-smothered-in-gravy	calories	0.8923747276688452
32220	crossroads-vegan-chicken-patty-smothered-in-gravy	fat	0.03278348376387592
32221	crossroads-vegan-chicken-patty-smothered-in-gravy	saturated_fat	0.004232804232804232
32222	crossroads-vegan-chicken-patty-smothered-in-gravy	trans_fat	0
32223	crossroads-vegan-chicken-patty-smothered-in-gravy	cholesterol	0
32224	crossroads-vegan-chicken-patty-smothered-in-gravy	sodium	3.067953107168793
32225	crossroads-vegan-chicken-patty-smothered-in-gravy	carbohydrates	0.04656084656084656
32226	crossroads-vegan-chicken-patty-smothered-in-gravy	fiber	0.002489884842826019
32227	crossroads-vegan-chicken-patty-smothered-in-gravy	sugar	0.01220043572984749
32228	crossroads-vegan-chicken-patty-smothered-in-gravy	protein	0.09926340906733064
32229	crossroads-vegan-chicken-patty-smothered-in-gravy	vitamin_a	0.003817823425666563
32230	crossroads-vegan-chicken-patty-smothered-in-gravy	vitamin_c	0.002904865649963689
32231	crossroads-vegan-chicken-patty-smothered-in-gravy	calcium	0.2592800082996161
32232	crossroads-vegan-chicken-patty-smothered-in-gravy	iron	0.01070650482415188
32233	crossroads-vegan-chicken-patty-smothered-in-gravy	water	0.2709824670608984
32234	crossroads-vegan-chicken-patty-smothered-in-gravy	potassium	0.4402116402116402
32235	crossroads-vegan-chicken-patty-smothered-in-gravy	vitamin_d	0
32236	crossroads-sauteed-green-beans-with-garlic-and-ginger	calories	0.5252254266338773
32237	crossroads-sauteed-green-beans-with-garlic-and-ginger	fat	0.01510296345977097
32238	crossroads-sauteed-green-beans-with-garlic-and-ginger	saturated_fat	0.001788508830762352
32239	crossroads-sauteed-green-beans-with-garlic-and-ginger	trans_fat	0
32240	crossroads-sauteed-green-beans-with-garlic-and-ginger	cholesterol	0
32241	crossroads-sauteed-green-beans-with-garlic-and-ginger	sodium	2.445785826067516
32242	crossroads-sauteed-green-beans-with-garlic-and-ginger	carbohydrates	0.07839630374841643
32243	crossroads-sauteed-green-beans-with-garlic-and-ginger	fiber	0.02354869960503764
32244	crossroads-sauteed-green-beans-with-garlic-and-ginger	sugar	0.03378294458106665
32245	crossroads-sauteed-green-beans-with-garlic-and-ginger	protein	0.0132150930272996
32246	crossroads-sauteed-green-beans-with-garlic-and-ginger	vitamin_a	0
32247	crossroads-sauteed-green-beans-with-garlic-and-ginger	vitamin_c	0.008445736145266662
32248	crossroads-sauteed-green-beans-with-garlic-and-ginger	calcium	0.3918821571403731
32249	crossroads-sauteed-green-beans-with-garlic-and-ginger	iron	0.006160419305959212
32250	crossroads-sauteed-green-beans-with-garlic-and-ginger	water	0.01579849467173411
32251	crossroads-sauteed-green-beans-with-garlic-and-ginger	potassium	1.160543507961348
32252	crossroads-sauteed-green-beans-with-garlic-and-ginger	vitamin_d	0
32253	crossroads-italian-vegetable-blend	calories	0.4708627278071723
32254	crossroads-italian-vegetable-blend	fat	0
32255	crossroads-italian-vegetable-blend	saturated_fat	0
32256	crossroads-italian-vegetable-blend	trans_fat	0
32257	crossroads-italian-vegetable-blend	cholesterol	0
32258	crossroads-italian-vegetable-blend	sodium	0.7059266607877718
32259	crossroads-italian-vegetable-blend	carbohydrates	0
32260	crossroads-italian-vegetable-blend	fiber	0
32261	crossroads-italian-vegetable-blend	sugar	0.02351557907113463
32262	crossroads-italian-vegetable-blend	protein	0.02351557907113463
32263	crossroads-italian-vegetable-blend	vitamin_a	0
32264	crossroads-italian-vegetable-blend	vitamin_c	0
32265	crossroads-italian-vegetable-blend	calcium	0.2353395061728395
32266	crossroads-italian-vegetable-blend	iron	0.004225455614344504
32267	crossroads-italian-vegetable-blend	water	0
32268	crossroads-italian-vegetable-blend	potassium	0
32269	crossroads-italian-vegetable-blend	vitamin_d	0
32270	crossroads-cinnamon-pancakes	calories	2.092507253797576
32271	crossroads-cinnamon-pancakes	fat	0.04822736005531704
32272	crossroads-cinnamon-pancakes	saturated_fat	0.009803020555708728
32273	crossroads-cinnamon-pancakes	trans_fat	0
32274	crossroads-cinnamon-pancakes	cholesterol	0.04472628128542107
32275	crossroads-cinnamon-pancakes	sodium	7.327495284484531
32276	crossroads-cinnamon-pancakes	carbohydrates	0.3894950131509271
32277	crossroads-cinnamon-pancakes	fiber	0.01242882963313071
32278	crossroads-cinnamon-pancakes	sugar	8.752696924739936e-05
32279	crossroads-cinnamon-pancakes	protein	0.03597358436068113
32280	crossroads-cinnamon-pancakes	vitamin_a	0
32281	crossroads-cinnamon-pancakes	vitamin_c	0
32282	crossroads-cinnamon-pancakes	calcium	0.7627100100218378
32283	crossroads-cinnamon-pancakes	iron	0.0133916262948521
32284	crossroads-cinnamon-pancakes	water	0.4359718338212961
32285	crossroads-cinnamon-pancakes	potassium	0
32286	crossroads-cinnamon-pancakes	vitamin_d	0
32289	crossroads-oatmeal	saturated_fat	0.001479587609341524
32290	crossroads-oatmeal	trans_fat	0
32291	crossroads-oatmeal	cholesterol	0
32292	crossroads-oatmeal	sodium	1.162364025898702
32293	crossroads-oatmeal	carbohydrates	0.09587727708533077
32294	crossroads-oatmeal	fiber	0.01449995857154694
32295	crossroads-oatmeal	sugar	0
32296	crossroads-oatmeal	protein	0.01739995028585633
32297	crossroads-oatmeal	vitamin_a	0
32298	crossroads-oatmeal	vitamin_c	0
32299	crossroads-oatmeal	calcium	0.04071825100907874
32300	crossroads-oatmeal	iron	0.005799983428618775
32301	crossroads-oatmeal	water	0.8584567309399523
32302	crossroads-oatmeal	potassium	0.5231821786631631
32303	crossroads-oatmeal	vitamin_d	0
32304	crossroads-cream-of-wheat	calories	0.3706055261610817
32305	crossroads-cream-of-wheat	fat	0
32306	crossroads-cream-of-wheat	saturated_fat	0
32307	crossroads-cream-of-wheat	trans_fat	0
32308	crossroads-cream-of-wheat	cholesterol	0
32309	crossroads-cream-of-wheat	sodium	0.4238095238095238
32310	crossroads-cream-of-wheat	carbohydrates	0.08077601410934744
32311	crossroads-cream-of-wheat	fiber	0.003409758965314521
32312	crossroads-cream-of-wheat	sugar	0
32313	crossroads-cream-of-wheat	protein	0.01352145796590241
32314	crossroads-cream-of-wheat	vitamin_a	0
32315	crossroads-cream-of-wheat	vitamin_c	0
32316	crossroads-cream-of-wheat	calcium	0
32317	crossroads-cream-of-wheat	iron	0
32318	crossroads-cream-of-wheat	water	0.8887713109935332
32319	crossroads-cream-of-wheat	potassium	0
32320	crossroads-cream-of-wheat	vitamin_d	0
32321	crossroads-jasmine-rice	calories	1.385471781305115
32322	crossroads-jasmine-rice	fat	0
32323	crossroads-jasmine-rice	saturated_fat	0
32324	crossroads-jasmine-rice	trans_fat	0
32325	crossroads-jasmine-rice	cholesterol	0
32326	crossroads-jasmine-rice	sodium	0
32327	crossroads-jasmine-rice	carbohydrates	0.3076499118165784
32328	crossroads-jasmine-rice	fiber	0.007716049382716048
32329	crossroads-jasmine-rice	sugar	0
32330	crossroads-jasmine-rice	protein	0.03075396825396825
32331	crossroads-jasmine-rice	vitamin_a	0
32332	crossroads-jasmine-rice	vitamin_c	0
32333	crossroads-jasmine-rice	calcium	0
32334	crossroads-jasmine-rice	iron	0
32335	crossroads-jasmine-rice	water	0.5999779541446207
32336	crossroads-jasmine-rice	potassium	0.1923500881834215
32337	crossroads-jasmine-rice	vitamin_d	0
32338	crossroads-brown-rice	calories	1.200793650793651
32339	crossroads-brown-rice	fat	0
32340	crossroads-brown-rice	saturated_fat	0
32341	crossroads-brown-rice	trans_fat	0
32342	crossroads-brown-rice	cholesterol	0
32343	crossroads-brown-rice	sodium	0
32344	crossroads-brown-rice	carbohydrates	0.2743386243386243
32345	crossroads-brown-rice	fiber	0.008641975308641974
32346	crossroads-brown-rice	sugar	0
32347	crossroads-brown-rice	protein	0.02566137566137566
32348	crossroads-brown-rice	vitamin_a	0
32349	crossroads-brown-rice	vitamin_c	0
32350	crossroads-brown-rice	calcium	0
32351	crossroads-brown-rice	iron	0
32352	crossroads-brown-rice	water	0.6399470899470898
32353	crossroads-brown-rice	potassium	0.8571428571428571
32354	crossroads-brown-rice	vitamin_d	0
32355	crossroads-mini-apple-coronet-danish	calories	3.025326278659612
32356	crossroads-mini-apple-coronet-danish	fat	0.1628218694885361
32357	crossroads-mini-apple-coronet-danish	saturated_fat	0.03499118165784832
32358	crossroads-mini-apple-coronet-danish	trans_fat	0
32359	crossroads-mini-apple-coronet-danish	cholesterol	0.1162610229276896
32360	crossroads-mini-apple-coronet-danish	sodium	1.744197530864197
32361	crossroads-mini-apple-coronet-danish	carbohydrates	0.3487830687830688
32362	crossroads-mini-apple-coronet-danish	fiber	0
32363	crossroads-mini-apple-coronet-danish	sugar	0.1698765432098765
32364	crossroads-mini-apple-coronet-danish	protein	0.02342151675485009
32365	crossroads-mini-apple-coronet-danish	vitamin_a	0
32366	crossroads-mini-apple-coronet-danish	vitamin_c	0
32367	crossroads-mini-apple-coronet-danish	calcium	0
32368	crossroads-mini-apple-coronet-danish	iron	0.008465608465608464
32369	crossroads-mini-apple-coronet-danish	water	0
32370	crossroads-mini-apple-coronet-danish	potassium	0
32371	crossroads-mini-apple-coronet-danish	vitamin_d	0
32372	crossroads-mini-cinnamon-swirl-danish	calories	3.490652557319224
32373	crossroads-mini-cinnamon-swirl-danish	fat	0.2093827160493827
32374	crossroads-mini-cinnamon-swirl-danish	saturated_fat	0.08126984126984126
32375	crossroads-mini-cinnamon-swirl-danish	trans_fat	0
32376	crossroads-mini-cinnamon-swirl-danish	cholesterol	0.2325220458553792
32377	crossroads-mini-cinnamon-swirl-danish	sodium	1.046349206349206
32378	crossroads-mini-cinnamon-swirl-danish	carbohydrates	0.3487830687830688
32379	crossroads-mini-cinnamon-swirl-danish	fiber	0
32380	crossroads-mini-cinnamon-swirl-danish	sugar	0.1399647266313933
32381	crossroads-mini-cinnamon-swirl-danish	protein	0.04656084656084655
32382	crossroads-mini-cinnamon-swirl-danish	vitamin_a	0
32383	crossroads-mini-cinnamon-swirl-danish	vitamin_c	0
32384	crossroads-mini-cinnamon-swirl-danish	calcium	0.6975661375661375
32385	crossroads-mini-cinnamon-swirl-danish	iron	0.09058201058201058
32386	crossroads-mini-cinnamon-swirl-danish	water	0
32387	crossroads-mini-cinnamon-swirl-danish	potassium	0.6975661375661375
32388	crossroads-mini-cinnamon-swirl-danish	vitamin_d	0
32389	crossroads-mini-cheese-plait-danish	calories	3.502222222222222
32390	crossroads-mini-cheese-plait-danish	fat	0.2249029982363315
32391	crossroads-mini-cheese-plait-danish	saturated_fat	0.08747795414462081
32392	crossroads-mini-cheese-plait-danish	trans_fat	0
32393	crossroads-mini-cheese-plait-danish	cholesterol	0.2500176366843033
32394	crossroads-mini-cheese-plait-danish	sodium	1.874850088183421
32395	crossroads-mini-cheese-plait-danish	carbohydrates	0.2999647266313933
32396	crossroads-mini-cheese-plait-danish	fiber	0.02511463844797178
32397	crossroads-mini-cheese-plait-danish	sugar	0.06687830687830688
32398	crossroads-mini-cheese-plait-danish	protein	0.04994708994708994
32399	crossroads-mini-cheese-plait-danish	vitamin_a	0
32400	crossroads-mini-cheese-plait-danish	vitamin_c	0
32401	crossroads-mini-cheese-plait-danish	calcium	0.6498765432098765
32402	crossroads-mini-cheese-plait-danish	iron	0.009029982363315696
32403	crossroads-mini-cheese-plait-danish	water	0
32404	crossroads-mini-cheese-plait-danish	potassium	0
32405	crossroads-mini-cheese-plait-danish	vitamin_d	0
32406	crossroads-mini-maple-pecan-danish	calories	3.862574955908289
32407	crossroads-mini-maple-pecan-danish	fat	0.2618694885361552
32408	crossroads-mini-maple-pecan-danish	saturated_fat	0.1072310405643739
32409	crossroads-mini-maple-pecan-danish	trans_fat	0
32410	crossroads-mini-maple-pecan-danish	cholesterol	0.1190828924162257
32411	crossroads-mini-maple-pecan-danish	sodium	1.904761904761905
32412	crossroads-mini-maple-pecan-danish	carbohydrates	0.3298765432098765
32413	crossroads-mini-maple-pecan-danish	fiber	0.0237037037037037
32414	crossroads-mini-maple-pecan-danish	sugar	0.1199294532627866
32415	crossroads-mini-maple-pecan-danish	protein	0.04204585537918871
32416	crossroads-mini-maple-pecan-danish	vitamin_a	0
32417	crossroads-mini-maple-pecan-danish	vitamin_c	0
32418	crossroads-mini-maple-pecan-danish	calcium	0.6191181657848324
32419	crossroads-mini-maple-pecan-danish	iron	0.008465608465608464
32420	crossroads-mini-maple-pecan-danish	water	0
32421	crossroads-mini-maple-pecan-danish	potassium	0
32422	crossroads-mini-maple-pecan-danish	vitamin_d	0
32423	crossroads-mini-butter-croissant	calories	3.463452870860278
32424	crossroads-mini-butter-croissant	fat	0.1732314324906917
32425	crossroads-mini-butter-croissant	saturated_fat	0.09602194787379972
32426	crossroads-mini-butter-croissant	trans_fat	0
32427	crossroads-mini-butter-croissant	cholesterol	0.3844797178130511
32428	crossroads-mini-butter-croissant	sodium	3.461493239271017
32429	crossroads-mini-butter-croissant	carbohydrates	0.4232804232804233
32430	crossroads-mini-butter-croissant	fiber	0
32431	crossroads-mini-butter-croissant	sugar	0.03840877914951989
32432	crossroads-mini-butter-croissant	protein	0.03840877914951989
32433	crossroads-mini-butter-croissant	vitamin_a	0
32434	crossroads-mini-butter-croissant	vitamin_c	0
32435	crossroads-mini-butter-croissant	calcium	0
32436	crossroads-mini-butter-croissant	iron	0.007838526357044876
32437	crossroads-mini-butter-croissant	water	0
32438	crossroads-mini-butter-croissant	potassium	0.3844797178130511
32439	crossroads-mini-butter-croissant	vitamin_d	0
32440	crossroads-waffles	calories	1.746245093019287
32441	crossroads-waffles	fat	0.03171758548102634
32442	crossroads-waffles	saturated_fat	0.00789383853899983
32443	crossroads-waffles	trans_fat	0
32444	crossroads-waffles	cholesterol	0.03968253968253968
32445	crossroads-waffles	sodium	6.504380724810832
32446	crossroads-waffles	carbohydrates	0.3410707174148034
32447	crossroads-waffles	fiber	0.00789383853899983
32448	crossroads-waffles	sugar	0
32449	crossroads-waffles	protein	0.03171758548102634
32450	crossroads-waffles	vitamin_a	0
32451	crossroads-waffles	vitamin_c	0
32452	crossroads-waffles	calcium	0.6187062638675541
32453	crossroads-waffles	iron	0.01137850600216192
32454	crossroads-waffles	water	0.5160863628605563
32455	crossroads-waffles	potassium	0
32456	crossroads-waffles	vitamin_d	0
32457	crossroads-pork-pozole	calories	0.4944970923501064
32458	crossroads-pork-pozole	fat	0.01310736240546315
32459	crossroads-pork-pozole	saturated_fat	0.00349529664145684
32460	crossroads-pork-pozole	trans_fat	0
32461	crossroads-pork-pozole	cholesterol	0.1318891932709714
32462	crossroads-pork-pozole	sodium	1.537173207968694
32463	crossroads-pork-pozole	carbohydrates	0.04508932667479323
32464	crossroads-pork-pozole	fiber	0.007398377891083645
32465	crossroads-pork-pozole	sugar	0.006000259234500908
32466	crossroads-pork-pozole	protein	0.04919630022850502
32467	crossroads-pork-pozole	vitamin_a	0.00530119990620954
32468	crossroads-pork-pozole	vitamin_c	0.03370048511804636
32469	crossroads-pork-pozole	calcium	0.126209336228604
32470	crossroads-pork-pozole	iron	0.004602140577918172
32471	crossroads-pork-pozole	water	0.6790778824910396
32472	crossroads-pork-pozole	potassium	1.163671634357018
32473	crossroads-pork-pozole	vitamin_d	0.0009903340484127712
32474	crossroads-vegan-pozole	calories	0.5620005844283948
32475	crossroads-vegan-pozole	fat	0.01800751450316912
32476	crossroads-vegan-pozole	saturated_fat	8.899924795635476e-05
32477	crossroads-vegan-pozole	trans_fat	0
32478	crossroads-vegan-pozole	cholesterol	0
32479	crossroads-vegan-pozole	sodium	1.634767852878309
32480	crossroads-vegan-pozole	carbohydrates	0.05900650139506321
32481	crossroads-vegan-pozole	fiber	0.01278622528972963
32482	crossroads-vegan-pozole	sugar	0.0102942463469517
32483	crossroads-vegan-pozole	protein	0.04488528738598825
32484	crossroads-vegan-pozole	vitamin_a	0.003292972174385126
32485	crossroads-vegan-pozole	vitamin_c	0.03379004780742936
32486	crossroads-vegan-pozole	calcium	0.1582109964504133
32487	crossroads-vegan-pozole	iron	0.007594602492275606
32488	crossroads-vegan-pozole	water	0.5148903158434978
32489	crossroads-vegan-pozole	potassium	1.150493278331798
32490	crossroads-vegan-pozole	vitamin_d	0
32491	crossroads-roasted-oregano-corn	calories	1.396290951846507
32492	crossroads-roasted-oregano-corn	fat	0.0508791619902731
32493	crossroads-roasted-oregano-corn	saturated_fat	0.008123563679119235
32494	crossroads-roasted-oregano-corn	trans_fat	0
32495	crossroads-roasted-oregano-corn	cholesterol	0
32496	crossroads-roasted-oregano-corn	sodium	1.574261129816685
32497	crossroads-roasted-oregano-corn	carbohydrates	0.1915450804339694
32498	crossroads-roasted-oregano-corn	fiber	0.03195980973758752
32499	crossroads-roasted-oregano-corn	sugar	0.05697183474961252
32500	crossroads-roasted-oregano-corn	protein	0.03195980973758752
32501	crossroads-roasted-oregano-corn	vitamin_a	0
32502	crossroads-roasted-oregano-corn	vitamin_c	0
32503	crossroads-roasted-oregano-corn	calcium	0
32504	crossroads-roasted-oregano-corn	iron	0.005344449788894233
32505	crossroads-roasted-oregano-corn	water	0
32506	crossroads-roasted-oregano-corn	potassium	2.022874245096467
32507	crossroads-roasted-oregano-corn	vitamin_d	0
32508	crossroads-tomatillo-avocado-verde-salad	calories	0.2363721137667498
32509	crossroads-tomatillo-avocado-verde-salad	fat	0.009730584443228121
32510	crossroads-tomatillo-avocado-verde-salad	saturated_fat	0.001216323055403515
32511	crossroads-tomatillo-avocado-verde-salad	trans_fat	0
32512	crossroads-tomatillo-avocado-verde-salad	cholesterol	0
32513	crossroads-tomatillo-avocado-verde-salad	sodium	0.03770601471750897
32514	crossroads-tomatillo-avocado-verde-salad	carbohydrates	0.03446248656976626
32515	crossroads-tomatillo-avocado-verde-salad	fiber	0.01540675870177786
32516	crossroads-tomatillo-avocado-verde-salad	sugar	0.03121895842202356
32517	crossroads-tomatillo-avocado-verde-salad	protein	0.01216323055403515
32518	crossroads-tomatillo-avocado-verde-salad	vitamin_a	0.01946116888645624
32519	crossroads-tomatillo-avocado-verde-salad	vitamin_c	0.06243791684404711
32520	crossroads-tomatillo-avocado-verde-salad	calcium	0.06162703480711144
32521	crossroads-tomatillo-avocado-verde-salad	iron	0.0105414664801638
32522	crossroads-tomatillo-avocado-verde-salad	water	0.1163615723002696
32523	crossroads-tomatillo-avocado-verde-salad	potassium	5.984309432585294
32524	crossroads-tomatillo-avocado-verde-salad	vitamin_d	0
32525	crossroads-roasted-tomato-salsa	calories	0.2594243316739211
32526	crossroads-roasted-tomato-salsa	fat	0.001737604364862165
32527	crossroads-roasted-tomato-salsa	saturated_fat	0.0003475208729724329
32528	crossroads-roasted-tomato-salsa	trans_fat	0
32529	crossroads-roasted-tomato-salsa	cholesterol	0
32530	crossroads-roasted-tomato-salsa	sodium	2.198764563296583
32531	crossroads-roasted-tomato-salsa	carbohydrates	0.05959982971477225
32532	crossroads-roasted-tomato-salsa	fiber	0.01355331404592488
32533	crossroads-roasted-tomato-salsa	sugar	0.03336200380535356
32534	crossroads-roasted-tomato-salsa	protein	0.01007810531620055
32535	crossroads-roasted-tomato-salsa	vitamin_a	0.02814919071076707
32536	crossroads-roasted-tomato-salsa	vitamin_c	0.14283107879167
32537	crossroads-roasted-tomato-salsa	calcium	0.1610759246227227
32538	crossroads-roasted-tomato-salsa	iron	0.00347520872972433
32539	crossroads-roasted-tomato-salsa	water	0.297825388137375
32540	crossroads-roasted-tomato-salsa	potassium	2.248286287695155
32541	crossroads-roasted-tomato-salsa	vitamin_d	0
32542	crossroads-housemade-corn-tortilla-chips	calories	2.202772420840956
32543	crossroads-housemade-corn-tortilla-chips	fat	0.08076612437983154
32544	crossroads-housemade-corn-tortilla-chips	saturated_fat	0.004615207107418946
32545	crossroads-housemade-corn-tortilla-chips	trans_fat	0
32546	crossroads-housemade-corn-tortilla-chips	cholesterol	0
32547	crossroads-housemade-corn-tortilla-chips	sodium	1.080947436087623
32548	crossroads-housemade-corn-tortilla-chips	carbohydrates	0.3418549835995318
32549	crossroads-housemade-corn-tortilla-chips	fiber	0.03593268390776179
32550	crossroads-housemade-corn-tortilla-chips	sugar	0.008241441263248116
32551	crossroads-housemade-corn-tortilla-chips	protein	0.03593268390776179
32552	crossroads-housemade-corn-tortilla-chips	vitamin_a	0
32553	crossroads-housemade-corn-tortilla-chips	vitamin_c	0
32554	crossroads-housemade-corn-tortilla-chips	calcium	0.7196426511068253
32555	crossroads-housemade-corn-tortilla-chips	iron	0
32556	crossroads-housemade-corn-tortilla-chips	water	0
32557	crossroads-housemade-corn-tortilla-chips	potassium	0
32558	crossroads-housemade-corn-tortilla-chips	vitamin_d	0
32559	crossroads-cheese-pizza	calories	2.501505570611262
32560	crossroads-cheese-pizza	fat	0.08925882909622747
32561	crossroads-cheese-pizza	saturated_fat	0.04764055577063707
32562	crossroads-cheese-pizza	trans_fat	0
32563	crossroads-cheese-pizza	cholesterol	0.2083064481438465
32564	crossroads-cheese-pizza	sodium	3.928571428571429
32565	crossroads-cheese-pizza	carbohydrates	0.3214393255043662
32566	crossroads-cheese-pizza	fiber	0.01193702413214608
32567	crossroads-cheese-pizza	sugar	0.006022282445046673
32568	crossroads-cheese-pizza	protein	0.107110594915473
32569	crossroads-cheese-pizza	vitamin_a	0
32570	crossroads-cheese-pizza	vitamin_c	0
32571	crossroads-cheese-pizza	calcium	1.785714285714286
32572	crossroads-cheese-pizza	iron	0.01957241794640169
32573	crossroads-cheese-pizza	water	0
32574	crossroads-cheese-pizza	potassium	2.85703531638491
32575	crossroads-cheese-pizza	vitamin_d	0
32576	crossroads-bbq-chicken-pizza	calories	1.955990817920338
32577	crossroads-bbq-chicken-pizza	fat	0.05948178103001905
32578	crossroads-bbq-chicken-pizza	saturated_fat	0.02958805962849868
32579	crossroads-bbq-chicken-pizza	trans_fat	0.0001222647092086723
32580	crossroads-bbq-chicken-pizza	cholesterol	0.3329879355298189
32581	crossroads-bbq-chicken-pizza	sodium	4.593301727906003
32582	crossroads-bbq-chicken-pizza	carbohydrates	0.2447739478357618
32583	crossroads-bbq-chicken-pizza	fiber	0.00819173551698104
32584	crossroads-bbq-chicken-pizza	sugar	0.0887030465308917
32585	crossroads-bbq-chicken-pizza	protein	0.110588429479244
32586	crossroads-bbq-chicken-pizza	vitamin_a	0.01039250028273714
32587	crossroads-bbq-chicken-pizza	vitamin_c	0
32588	crossroads-bbq-chicken-pizza	calcium	1.055878028726094
32589	crossroads-bbq-chicken-pizza	iron	0.01332685330374527
32590	crossroads-bbq-chicken-pizza	water	0.1203084738613335
32591	crossroads-bbq-chicken-pizza	potassium	2.68517754364086
32592	crossroads-bbq-chicken-pizza	vitamin_d	0.0001833970638130084
32593	crossroads-thai-bbq-chicken	calories	2.531053839297567
32594	crossroads-thai-bbq-chicken	fat	0.2073732718894009
32595	crossroads-thai-bbq-chicken	saturated_fat	0.05319451556010695
32596	crossroads-thai-bbq-chicken	trans_fat	0
32597	crossroads-thai-bbq-chicken	cholesterol	0.6967438508657147
32598	crossroads-thai-bbq-chicken	sodium	1.927234454116174
32599	crossroads-thai-bbq-chicken	carbohydrates	0.01393866985264835
32600	crossroads-thai-bbq-chicken	fiber	0.0001896417667026986
32601	crossroads-thai-bbq-chicken	sugar	0.009956192751891675
32602	crossroads-thai-bbq-chicken	protein	0.1459293394777265
32603	crossroads-thai-bbq-chicken	vitamin_a	0.4214788264967476
32604	crossroads-thai-bbq-chicken	vitamin_c	0.002560163850486431
32605	crossroads-thai-bbq-chicken	calcium	0.1098974038042138
32606	crossroads-thai-bbq-chicken	iron	0.009007983918378183
32607	crossroads-thai-bbq-chicken	water	0.590165177978798
32608	crossroads-thai-bbq-chicken	potassium	1.637556655477802
32609	crossroads-thai-bbq-chicken	vitamin_d	0
32610	crossroads-sweet-chili-roasted-brussels-sprouts	calories	0.6659498816361561
32611	crossroads-sweet-chili-roasted-brussels-sprouts	fat	0.00273510077431646
32612	crossroads-sweet-chili-roasted-brussels-sprouts	saturated_fat	0.0004715690990200794
32613	crossroads-sweet-chili-roasted-brussels-sprouts	trans_fat	0
32614	crossroads-sweet-chili-roasted-brussels-sprouts	cholesterol	0
32615	crossroads-sweet-chili-roasted-brussels-sprouts	sodium	1.85486989408558
32616	crossroads-sweet-chili-roasted-brussels-sprouts	carbohydrates	0.148827207650737
32617	crossroads-sweet-chili-roasted-brussels-sprouts	fiber	0.03753690028199832
32618	crossroads-sweet-chili-roasted-brussels-sprouts	sugar	0.07799752897792112
32619	crossroads-sweet-chili-roasted-brussels-sprouts	protein	0.02933159795904893
32620	crossroads-sweet-chili-roasted-brussels-sprouts	vitamin_a	0.3918739212856859
32621	crossroads-sweet-chili-roasted-brussels-sprouts	vitamin_c	0.7812013694366634
32622	crossroads-sweet-chili-roasted-brussels-sprouts	calcium	0.3619764404078129
32623	crossroads-sweet-chili-roasted-brussels-sprouts	iron	0.01216648275471805
32624	crossroads-sweet-chili-roasted-brussels-sprouts	water	0.7745050882305784
32625	crossroads-sweet-chili-roasted-brussels-sprouts	potassium	3.415197728923219
32626	crossroads-sweet-chili-roasted-brussels-sprouts	vitamin_d	0
32627	crossroads-vegetable-eggroll	calories	2.432049316784519
32628	crossroads-vegetable-eggroll	fat	0.1651584829154922
32629	crossroads-vegetable-eggroll	saturated_fat	0.01285664837066706
32630	crossroads-vegetable-eggroll	trans_fat	0
32631	crossroads-vegetable-eggroll	cholesterol	0
32632	crossroads-vegetable-eggroll	sodium	4.629052728741201
32633	crossroads-vegetable-eggroll	carbohydrates	0.2231782294087589
32634	crossroads-vegetable-eggroll	fiber	0.01648288252649623
32635	crossroads-vegetable-eggroll	sugar	0
32636	crossroads-vegetable-eggroll	protein	0.03313059387825742
32637	crossroads-vegetable-eggroll	vitamin_a	0
32638	crossroads-vegetable-eggroll	vitamin_c	0
32639	crossroads-vegetable-eggroll	calcium	0.3306466234815144
32640	crossroads-vegetable-eggroll	iron	0.009065585389572929
32641	crossroads-vegetable-eggroll	water	0
32642	crossroads-vegetable-eggroll	potassium	1.570653875949826
32643	crossroads-vegetable-eggroll	vitamin_d	0
32644	crossroads-chicken-tikka-masala-soup	calories	0.8167989417989417
32645	crossroads-chicken-tikka-masala-soup	fat	0.04898589065255731
32646	crossroads-chicken-tikka-masala-soup	saturated_fat	0
32647	crossroads-chicken-tikka-masala-soup	trans_fat	0
32648	crossroads-chicken-tikka-masala-soup	cholesterol	0.2041005291005291
32649	crossroads-chicken-tikka-masala-soup	sodium	2.081569664902998
32650	crossroads-chicken-tikka-masala-soup	carbohydrates	0.04898589065255731
32651	crossroads-chicken-tikka-masala-soup	fiber	0.01221340388007055
32652	crossroads-chicken-tikka-masala-soup	sugar	0.02041446208112875
32653	crossroads-chicken-tikka-masala-soup	protein	0.04488536155202821
32654	crossroads-chicken-tikka-masala-soup	vitamin_a	0
32655	crossroads-chicken-tikka-masala-soup	vitamin_c	0
32656	crossroads-chicken-tikka-masala-soup	calcium	0.2570987654320988
32657	crossroads-chicken-tikka-masala-soup	iron	0.0082010582010582
32658	crossroads-chicken-tikka-masala-soup	water	0
32659	crossroads-chicken-tikka-masala-soup	potassium	2.571340388007054
32660	crossroads-chicken-tikka-masala-soup	vitamin_d	0
32661	crossroads-bean-chili	calories	1.306878306878307
32662	crossroads-bean-chili	fat	0.02861552028218695
32663	crossroads-bean-chili	saturated_fat	0
32664	crossroads-bean-chili	trans_fat	0
32665	crossroads-bean-chili	cholesterol	0
32666	crossroads-bean-chili	sodium	2.612169312169312
32667	crossroads-bean-chili	carbohydrates	0.1877865961199295
32668	crossroads-bean-chili	fiber	0.04898589065255731
32669	crossroads-bean-chili	sugar	0.02861552028218695
32670	crossroads-bean-chili	protein	0.05308641975308642
32671	crossroads-bean-chili	vitamin_a	0
32672	crossroads-bean-chili	vitamin_c	0
32673	crossroads-bean-chili	calcium	0.4897707231040564
32674	crossroads-bean-chili	iron	0.01221340388007055
32675	crossroads-bean-chili	water	0
32676	crossroads-bean-chili	potassium	3.142857142857142
32677	crossroads-bean-chili	vitamin_d	0
32678	crossroads-halal-ground-beef	calories	2.580056714043642
32679	crossroads-halal-ground-beef	fat	0.2079226752429367
32680	crossroads-halal-ground-beef	saturated_fat	0.07357263893211605
32681	crossroads-halal-ground-beef	trans_fat	0.01106615485700453
32682	crossroads-halal-ground-beef	cholesterol	0.6675139191479059
32683	crossroads-halal-ground-beef	sodium	2.337120033198464
32684	crossroads-halal-ground-beef	carbohydrates	0.002161358370508697
32685	crossroads-halal-ground-beef	fiber	0.001210360687484871
32686	crossroads-halal-ground-beef	sugar	0.0002593630044610437
32687	crossroads-halal-ground-beef	protein	0.1625341494622541
32688	crossroads-halal-ground-beef	vitamin_a	0.03760763564685133
32689	crossroads-halal-ground-beef	vitamin_c	0
32690	crossroads-halal-ground-beef	calcium	0.2174326520731749
32691	crossroads-halal-ground-beef	iron	0.0204032230176021
32692	crossroads-halal-ground-beef	water	0.5815783103364802
32693	crossroads-halal-ground-beef	potassium	2.731524708648891
32694	crossroads-halal-ground-beef	vitamin_d	0.0008645433482034789
32695	crossroads-braised-mung-bean	calories	1.06778252611586
32696	crossroads-braised-mung-bean	fat	0.003476461809795143
32697	crossroads-braised-mung-bean	saturated_fat	0.001102292768959436
32698	crossroads-braised-mung-bean	trans_fat	0
32699	crossroads-braised-mung-bean	cholesterol	0
32700	crossroads-braised-mung-bean	sodium	0.04621150454483787
32701	crossroads-braised-mung-bean	carbohydrates	0.1927316510649844
32702	crossroads-braised-mung-bean	fiber	0.05019671686338352
32703	crossroads-braised-mung-bean	sugar	0.02026522859856193
32704	crossroads-braised-mung-bean	protein	0.07342965676299008
32705	crossroads-braised-mung-bean	vitamin_a	0.01848460181793515
32706	crossroads-braised-mung-bean	vitamin_c	0.01483855650522317
32707	crossroads-braised-mung-bean	calcium	0.4061524894858228
32708	crossroads-braised-mung-bean	iron	0.02068918735585402
32709	crossroads-braised-mung-bean	water	0.7202211368878035
32710	crossroads-braised-mung-bean	potassium	3.833774250440917
32711	crossroads-braised-mung-bean	vitamin_d	0
32712	crossroads-stir-fried-cabbage	calories	0.3020772094846169
32713	crossroads-stir-fried-cabbage	fat	0.0009798157946306096
32714	crossroads-stir-fried-cabbage	saturated_fat	0.0002939447383891828
32715	crossroads-stir-fried-cabbage	trans_fat	0
32716	crossroads-stir-fried-cabbage	cholesterol	0
32717	crossroads-stir-fried-cabbage	sodium	1.154125024495395
32718	crossroads-stir-fried-cabbage	carbohydrates	0.07211444248481284
32719	crossroads-stir-fried-cabbage	fiber	0.02400548696844993
32720	crossroads-stir-fried-cabbage	sugar	0.03488144228884969
32721	crossroads-stir-fried-cabbage	protein	0.01234567901234568
32722	crossroads-stir-fried-cabbage	vitamin_a	0.04781501077797373
32723	crossroads-stir-fried-cabbage	vitamin_c	0.3495982755242014
32724	crossroads-stir-fried-cabbage	calcium	0.3824221046443269
32725	crossroads-stir-fried-cabbage	iron	0.004605134234763863
32726	crossroads-stir-fried-cabbage	water	0.8976092494611013
32727	crossroads-stir-fried-cabbage	potassium	1.624240642759161
32728	crossroads-stir-fried-cabbage	vitamin_d	0
32729	crossroads-forbidden-rice	calories	0.9809757236227823
32730	crossroads-forbidden-rice	fat	0.009790953418404396
32731	crossroads-forbidden-rice	saturated_fat	0
32732	crossroads-forbidden-rice	trans_fat	0
32733	crossroads-forbidden-rice	cholesterol	0
32734	crossroads-forbidden-rice	sodium	0
32735	crossroads-forbidden-rice	carbohydrates	0.2157251789604731
32736	crossroads-forbidden-rice	fiber	0.01958190683680879
32737	crossroads-forbidden-rice	sugar	0
32738	crossroads-forbidden-rice	protein	0.02613082269945015
32739	crossroads-forbidden-rice	vitamin_a	0
32740	crossroads-forbidden-rice	vitamin_c	0
32741	crossroads-forbidden-rice	calcium	0
32742	crossroads-forbidden-rice	iron	0.006484075111526091
32743	crossroads-forbidden-rice	water	0.7058564166407302
32744	crossroads-forbidden-rice	potassium	0.7843137254901958
32745	crossroads-forbidden-rice	vitamin_d	0
32746	crossroads-roasted-pork	calories	1.561440542442269
32747	crossroads-roasted-pork	fat	0.0791366249051914
32748	crossroads-roasted-pork	saturated_fat	0.02759729875446628
32749	crossroads-roasted-pork	trans_fat	0.0008224360555966773
32750	crossroads-roasted-pork	cholesterol	0.5875848708318483
32751	crossroads-roasted-pork	sodium	1.986000310698065
32752	crossroads-roasted-pork	carbohydrates	0.007584688068280468
32753	crossroads-roasted-pork	fiber	0
32754	crossroads-roasted-pork	sugar	0
32755	crossroads-roasted-pork	protein	0.2046038142756623
32756	crossroads-roasted-pork	vitamin_a	0.03984245780446126
32757	crossroads-roasted-pork	vitamin_c	0
32758	crossroads-roasted-pork	calcium	0.05976368670669189
32759	crossroads-roasted-pork	iron	0.007401924500370097
32760	crossroads-roasted-pork	water	0.6942274127075508
32761	crossroads-roasted-pork	potassium	3.704983048679076
32762	crossroads-roasted-pork	vitamin_d	0.005025998117535251
32763	crossroads-sauteed-potato-tofu-masala	calories	1.082882132444815
32764	crossroads-sauteed-potato-tofu-masala	fat	0.03840992179184598
32765	crossroads-sauteed-potato-tofu-masala	saturated_fat	0.001491148235560286
32766	crossroads-sauteed-potato-tofu-masala	trans_fat	0
32767	crossroads-sauteed-potato-tofu-masala	cholesterol	0
32768	crossroads-sauteed-potato-tofu-masala	sodium	0.6518888734632174
32769	crossroads-sauteed-potato-tofu-masala	carbohydrates	0.09728456764414005
32770	crossroads-sauteed-potato-tofu-masala	fiber	0.02241864243807878
32771	crossroads-sauteed-potato-tofu-masala	sugar	0.01018094312554954
32772	crossroads-sauteed-potato-tofu-masala	protein	0.08808058370740586
32773	crossroads-sauteed-potato-tofu-masala	vitamin_a	0.002005337282305212
32774	crossroads-sauteed-potato-tofu-masala	vitamin_c	0.03239390994493035
32775	crossroads-sauteed-potato-tofu-masala	calcium	1.232459726142914
32776	crossroads-sauteed-potato-tofu-masala	iron	0.004422025802006365
32777	crossroads-sauteed-potato-tofu-masala	water	0.2236208164293684
32778	crossroads-sauteed-potato-tofu-masala	potassium	2.473557828271142
32779	crossroads-sauteed-potato-tofu-masala	vitamin_d	0
32780	crossroads-kosher-spiced-couscous	calories	3.035334184759472
32781	crossroads-kosher-spiced-couscous	fat	0.02988679507562923
32782	crossroads-kosher-spiced-couscous	saturated_fat	0.003127687856751896
32783	crossroads-kosher-spiced-couscous	trans_fat	0
32784	crossroads-kosher-spiced-couscous	cholesterol	0
32785	crossroads-kosher-spiced-couscous	sodium	2.143248103839237
32786	crossroads-kosher-spiced-couscous	carbohydrates	0.5683703877464141
32787	crossroads-kosher-spiced-couscous	fiber	0.03883545755466938
32788	crossroads-kosher-spiced-couscous	sugar	0.007297938332421092
32789	crossroads-kosher-spiced-couscous	protein	0.0951338389762035
32790	crossroads-kosher-spiced-couscous	vitamin_a	0
32791	crossroads-kosher-spiced-couscous	vitamin_c	0.01277139208173691
32792	crossroads-kosher-spiced-couscous	calcium	0.2118139720766979
32793	crossroads-kosher-spiced-couscous	iron	0.007471698768907308
32794	crossroads-kosher-spiced-couscous	water	0.548214177114013
32795	crossroads-kosher-spiced-couscous	potassium	1.471142735510552
32796	crossroads-kosher-spiced-couscous	vitamin_d	0
32797	crossroads-steamed-mint-peas	calories	0.965833558426151
32798	crossroads-steamed-mint-peas	fat	0.02277409684817092
32799	crossroads-steamed-mint-peas	saturated_fat	0.003283706987410691
32800	crossroads-steamed-mint-peas	trans_fat	0
32801	crossroads-steamed-mint-peas	cholesterol	0
32802	crossroads-steamed-mint-peas	sodium	0.3477551625699773
32803	crossroads-steamed-mint-peas	carbohydrates	0.1310305014008717
32804	crossroads-steamed-mint-peas	fiber	0.04374745115485856
32805	crossroads-steamed-mint-peas	sugar	0.05370449814894259
32806	crossroads-steamed-mint-peas	protein	0.05423412830820238
32807	crossroads-steamed-mint-peas	vitamin_a	0
32808	crossroads-steamed-mint-peas	vitamin_c	0
32809	crossroads-steamed-mint-peas	calcium	0.160477938255716
32810	crossroads-steamed-mint-peas	iron	0.01101630731260361
32811	crossroads-steamed-mint-peas	water	0
32812	crossroads-steamed-mint-peas	potassium	1.456800716059975
32813	crossroads-steamed-mint-peas	vitamin_d	0
32814	crossroads-sauteed-green-beans	calories	0.5722124240642759
32815	crossroads-sauteed-green-beans	fat	0.02415113526224637
32816	crossroads-sauteed-green-beans	saturated_fat	0.002754076828150902
32817	crossroads-sauteed-green-beans	trans_fat	0
32818	crossroads-sauteed-green-beans	cholesterol	0
32819	crossroads-sauteed-green-beans	sodium	1.301089449237597
32820	crossroads-sauteed-green-beans	carbohydrates	0.07012303308599604
32821	crossroads-sauteed-green-beans	fiber	0.02319780097557875
32822	crossroads-sauteed-green-beans	sugar	0.03421410828818236
32823	crossroads-sauteed-green-beans	protein	0.01165186350371535
32824	crossroads-sauteed-green-beans	vitamin_a	0
32825	crossroads-sauteed-green-beans	vitamin_c	0.004025189210374395
32826	crossroads-sauteed-green-beans	calcium	0.3478610886018293
32827	crossroads-sauteed-green-beans	iron	0.005825931751857677
32828	crossroads-sauteed-green-beans	water	0.0095333428666762
32829	crossroads-sauteed-green-beans	potassium	1.052375126449201
32830	crossroads-sauteed-green-beans	vitamin_d	0
32831	foothill-scrambled-eggs	calories	1.64591102674224
32832	foothill-scrambled-eggs	fat	0.1139877306119884
32833	foothill-scrambled-eggs	saturated_fat	0.0334782862348596
32834	foothill-scrambled-eggs	trans_fat	0
32835	foothill-scrambled-eggs	cholesterol	3.640516804214853
32836	foothill-scrambled-eggs	sodium	1.499252796962721
32837	foothill-scrambled-eggs	carbohydrates	0.02082295551337112
32838	foothill-scrambled-eggs	fiber	0
32839	foothill-scrambled-eggs	sugar	0
32840	foothill-scrambled-eggs	protein	0.1249377330802267
32841	foothill-scrambled-eggs	vitamin_a	0
32842	foothill-scrambled-eggs	vitamin_c	0
32843	foothill-scrambled-eggs	calcium	0.6240603865709887
32844	foothill-scrambled-eggs	iron	0.01660451193954162
32845	foothill-scrambled-eggs	water	0
32846	foothill-scrambled-eggs	potassium	1.352145796590241
32847	foothill-scrambled-eggs	vitamin_d	0
32848	foothill-denver-eggs-scramble	calories	1.515683462723961
32849	foothill-denver-eggs-scramble	fat	0.09263379979890883
32850	foothill-denver-eggs-scramble	saturated_fat	0.02629019762976149
32851	foothill-denver-eggs-scramble	trans_fat	0
32852	foothill-denver-eggs-scramble	cholesterol	2.611053421022268
32853	foothill-denver-eggs-scramble	sodium	4.446010318284461
32854	foothill-denver-eggs-scramble	carbohydrates	0.03617992714565923
32855	foothill-denver-eggs-scramble	fiber	0.00280209002950436
32856	foothill-denver-eggs-scramble	sugar	0.005769008884273681
32857	foothill-denver-eggs-scramble	protein	0.1241985198371491
32858	foothill-denver-eggs-scramble	vitamin_a	0.06453048509123274
32859	foothill-denver-eggs-scramble	vitamin_c	0.0769750613987374
32860	foothill-denver-eggs-scramble	calcium	0.4541858280176037
32861	foothill-denver-eggs-scramble	iron	0.01376320690962435
32862	foothill-denver-eggs-scramble	water	0.06889844896075424
32863	foothill-denver-eggs-scramble	potassium	1.189404803111968
32864	foothill-denver-eggs-scramble	vitamin_d	0
32865	foothill-bread-pudding	calories	2.929556163387009
32866	foothill-bread-pudding	fat	0.1803871455612749
32867	foothill-bread-pudding	saturated_fat	0.106777320707669
32868	foothill-bread-pudding	trans_fat	0
32869	foothill-bread-pudding	cholesterol	1.70255025976419
32870	foothill-bread-pudding	sodium	3.421038147406306
32871	foothill-bread-pudding	carbohydrates	0.2548106030693095
32872	foothill-bread-pudding	fiber	0.006891947190454653
32873	foothill-bread-pudding	sugar	0.1221884803974356
32874	foothill-bread-pudding	protein	0.05647567836622563
32875	foothill-bread-pudding	vitamin_a	0
32876	foothill-bread-pudding	vitamin_c	0
32877	foothill-bread-pudding	calcium	0.3873848649968052
32878	foothill-bread-pudding	iron	0.01139085716200144
32879	foothill-bread-pudding	water	0
32880	foothill-bread-pudding	potassium	0.5957705460193022
32881	foothill-bread-pudding	vitamin_d	0
32882	foothill-grilled-asparagus	calories	0.5574052565922485
32883	foothill-grilled-asparagus	fat	0.0402632597754549
32884	foothill-grilled-asparagus	saturated_fat	0.004903858562395148
32885	foothill-grilled-asparagus	trans_fat	0
32886	foothill-grilled-asparagus	cholesterol	0
32887	foothill-grilled-asparagus	sodium	0.6953155245838172
32888	foothill-grilled-asparagus	carbohydrates	0.03819847722286748
32889	foothill-grilled-asparagus	fiber	0.02021766249408526
32890	foothill-grilled-asparagus	sugar	0.01806684733514002
32891	foothill-grilled-asparagus	protein	0.02081989073858993
32892	foothill-grilled-asparagus	vitamin_a	0.3558308598959005
32893	foothill-grilled-asparagus	vitamin_c	0.05239385727190605
32894	foothill-grilled-asparagus	calcium	0.2298791241880673
32895	foothill-grilled-asparagus	iron	0.02021766249408526
32896	foothill-grilled-asparagus	water	0.8728868241063362
32897	foothill-grilled-asparagus	potassium	1.891426850776444
32898	foothill-grilled-asparagus	vitamin_d	0
32899	foothill-oatmeal	calories	0.5525963803368725
32900	foothill-oatmeal	fat	0.008699975142928163
32901	foothill-oatmeal	saturated_fat	0.001479587609341524
32902	foothill-oatmeal	trans_fat	0
32903	foothill-oatmeal	cholesterol	0
32904	foothill-oatmeal	sodium	1.162364025898702
32905	foothill-oatmeal	carbohydrates	0.09587727708533077
32906	foothill-oatmeal	fiber	0.01449995857154694
32907	foothill-oatmeal	sugar	0
32908	foothill-oatmeal	protein	0.01739995028585633
32909	foothill-oatmeal	vitamin_a	0
32910	foothill-oatmeal	vitamin_c	0
32911	foothill-oatmeal	calcium	0.04071825100907874
32912	foothill-oatmeal	iron	0.005799983428618775
32913	foothill-oatmeal	water	0.8584567309399523
32914	foothill-oatmeal	potassium	0.5231821786631631
32915	foothill-oatmeal	vitamin_d	0
32916	foothill-brown-rice	calories	1.200793650793651
32917	foothill-brown-rice	fat	0
32918	foothill-brown-rice	saturated_fat	0
32919	foothill-brown-rice	trans_fat	0
32920	foothill-brown-rice	cholesterol	0
32921	foothill-brown-rice	sodium	0
32922	foothill-brown-rice	carbohydrates	0.2743386243386243
32923	foothill-brown-rice	fiber	0.008641975308641974
32924	foothill-brown-rice	sugar	0
32925	foothill-brown-rice	protein	0.02566137566137566
32926	foothill-brown-rice	vitamin_a	0
32927	foothill-brown-rice	vitamin_c	0
32928	foothill-brown-rice	calcium	0
32929	foothill-brown-rice	iron	0
32930	foothill-brown-rice	water	0.6399470899470898
32931	foothill-brown-rice	potassium	0.8571428571428571
32932	foothill-brown-rice	vitamin_d	0
32933	foothill-basmati-rice	calories	1.081796081796082
32934	foothill-basmati-rice	fat	0
32935	foothill-basmati-rice	saturated_fat	0
32936	foothill-basmati-rice	trans_fat	0
32937	foothill-basmati-rice	cholesterol	0
32938	foothill-basmati-rice	sodium	0
32939	foothill-basmati-rice	carbohydrates	0.2522760856094189
32940	foothill-basmati-rice	fiber	0
32941	foothill-basmati-rice	sugar	0
32942	foothill-basmati-rice	protein	0.0215691882358549
32943	foothill-basmati-rice	vitamin_a	0
32944	foothill-basmati-rice	vitamin_c	0
32945	foothill-basmati-rice	calcium	0
32946	foothill-basmati-rice	iron	0.007745841079174413
32947	foothill-basmati-rice	water	0.6756756756756757
32948	foothill-basmati-rice	potassium	0
32949	foothill-basmati-rice	vitamin_d	0
32950	foothill-mini-assorted-danish	calories	3.515767195767196
32951	foothill-mini-assorted-danish	fat	0.1890652557319224
32952	foothill-mini-assorted-danish	saturated_fat	0.0945326278659612
32953	foothill-mini-assorted-danish	trans_fat	0
32954	foothill-mini-assorted-danish	cholesterol	0.2703350970017637
32955	foothill-mini-assorted-danish	sodium	4.05389770723104
32956	foothill-mini-assorted-danish	carbohydrates	0.3781305114638448
32957	foothill-mini-assorted-danish	fiber	0
32958	foothill-mini-assorted-danish	sugar	0.1351675485008818
32959	foothill-mini-assorted-danish	protein	0.05417989417989418
32960	foothill-mini-assorted-danish	vitamin_a	0
32961	foothill-mini-assorted-danish	vitamin_c	0
32962	foothill-mini-assorted-danish	calcium	0.2161552028218695
32963	foothill-mini-assorted-danish	iron	0
32964	foothill-mini-assorted-danish	water	0
32965	foothill-mini-assorted-danish	potassium	0.2703350970017637
32966	foothill-mini-assorted-danish	vitamin_d	0
32967	foothill-red-red---black-eyed-peas-stew	calories	1.569047619047619
32968	foothill-red-red---black-eyed-peas-stew	fat	0.03218694885361552
32969	foothill-red-red---black-eyed-peas-stew	saturated_fat	0.002380952380952381
32970	foothill-red-red---black-eyed-peas-stew	trans_fat	0
32971	foothill-red-red---black-eyed-peas-stew	cholesterol	0
32972	foothill-red-red---black-eyed-peas-stew	sodium	2.275925925925926
32973	foothill-red-red---black-eyed-peas-stew	carbohydrates	0.2994708994708994
32974	foothill-red-red---black-eyed-peas-stew	fiber	0.0835978835978836
32975	foothill-red-red---black-eyed-peas-stew	sugar	0.02266313932980599
32976	foothill-red-red---black-eyed-peas-stew	protein	0.1004409171075838
32977	foothill-red-red---black-eyed-peas-stew	vitamin_a	0.3128747795414462
32978	foothill-red-red---black-eyed-peas-stew	vitamin_c	0.11331569664903
32979	foothill-red-red---black-eyed-peas-stew	calcium	0.1471781305114639
32980	foothill-red-red---black-eyed-peas-stew	iron	0.02707231040564374
32981	foothill-red-red---black-eyed-peas-stew	water	0.2700176366843033
32982	foothill-red-red---black-eyed-peas-stew	potassium	4.602380952380952
32983	foothill-red-red---black-eyed-peas-stew	vitamin_d	0
32984	foothill-steamed-broccoli	calories	0.2820032333921223
32985	foothill-steamed-broccoli	fat	0.003490593768371546
32986	foothill-steamed-broccoli	saturated_fat	0.0004592886537330982
32987	foothill-steamed-broccoli	trans_fat	0
32988	foothill-steamed-broccoli	cholesterol	0
32989	foothill-steamed-broccoli	sodium	0.2699698706643151
32990	foothill-steamed-broccoli	carbohydrates	0.05061360964138741
32991	foothill-steamed-broccoli	fiber	0.02296443268665491
32992	foothill-steamed-broccoli	sugar	0.01478909465020576
32993	foothill-steamed-broccoli	protein	0.02976190476190476
32994	foothill-steamed-broccoli	vitamin_a	0
32995	foothill-steamed-broccoli	vitamin_c	0.9319885361552028
32996	foothill-steamed-broccoli	calcium	0.4799566431510876
32997	foothill-steamed-broccoli	iron	0.008818342151675485
32998	foothill-steamed-broccoli	water	0.9069113756613757
32999	foothill-steamed-broccoli	potassium	3.249926513815403
33000	foothill-steamed-broccoli	vitamin_d	0
33001	foothill-roasted-carrot-zucchini-eggplant-and-onion	calories	0.577225435106572
33002	foothill-roasted-carrot-zucchini-eggplant-and-onion	fat	0.03263014460258215
33003	foothill-roasted-carrot-zucchini-eggplant-and-onion	saturated_fat	0.003919263178522437
33004	foothill-roasted-carrot-zucchini-eggplant-and-onion	trans_fat	0
33005	foothill-roasted-carrot-zucchini-eggplant-and-onion	cholesterol	0
33006	foothill-roasted-carrot-zucchini-eggplant-and-onion	sodium	2.004384106020626
33007	foothill-roasted-carrot-zucchini-eggplant-and-onion	carbohydrates	0.06671861969019592
33008	foothill-roasted-carrot-zucchini-eggplant-and-onion	fiber	0.02105464637764379
33009	foothill-roasted-carrot-zucchini-eggplant-and-onion	sugar	0.03490878598544404
33010	foothill-roasted-carrot-zucchini-eggplant-and-onion	protein	0.01011716773990676
33011	foothill-roasted-carrot-zucchini-eggplant-and-onion	vitamin_a	1.735777859808867
33012	foothill-roasted-carrot-zucchini-eggplant-and-onion	vitamin_c	0.05249989746113777
33013	foothill-roasted-carrot-zucchini-eggplant-and-onion	calcium	0.2088146963254629
33014	foothill-roasted-carrot-zucchini-eggplant-and-onion	iron	0.004283845799780338
33015	foothill-roasted-carrot-zucchini-eggplant-and-onion	water	0.4660277356229122
33016	foothill-roasted-carrot-zucchini-eggplant-and-onion	potassium	2.156688496051114
33017	foothill-roasted-carrot-zucchini-eggplant-and-onion	vitamin_d	0
33018	foothill-north-african-style-roasted-chicken	calories	2.360340834236416
33019	foothill-north-african-style-roasted-chicken	fat	0.1782367565500095
33020	foothill-north-african-style-roasted-chicken	saturated_fat	0.0443679479824058
33021	foothill-north-african-style-roasted-chicken	trans_fat	0.0009349567582499309
33022	foothill-north-african-style-roasted-chicken	cholesterol	0.6945028792418348
33023	foothill-north-african-style-roasted-chicken	sodium	1.485561292790208
33024	foothill-north-african-style-roasted-chicken	carbohydrates	0.003569834895136099
33025	foothill-north-african-style-roasted-chicken	fiber	0.006034720894158644
33026	foothill-north-african-style-roasted-chicken	sugar	8.499606893181189e-05
33027	foothill-north-african-style-roasted-chicken	protein	0.1724570238626463
33028	foothill-north-african-style-roasted-chicken	vitamin_a	0.3795924438494719
33029	foothill-north-african-style-roasted-chicken	vitamin_c	0.01478931599413527
33030	foothill-north-african-style-roasted-chicken	calcium	0.1478081638724209
33031	foothill-north-african-style-roasted-chicken	iron	0.008839591168908437
33032	foothill-north-african-style-roasted-chicken	water	0.6109517434818639
33033	foothill-north-african-style-roasted-chicken	potassium	1.761288540405006
33034	foothill-north-african-style-roasted-chicken	vitamin_d	0.001869913516499862
33035	foothill-turkey-melt-sandwich	calories	2.032673455617818
33036	foothill-turkey-melt-sandwich	fat	0.07440231960172876
33037	foothill-turkey-melt-sandwich	saturated_fat	0.02912527777126497
33038	foothill-turkey-melt-sandwich	trans_fat	0.0001042049294141859
33039	foothill-turkey-melt-sandwich	cholesterol	0.2326896073818772
33040	foothill-turkey-melt-sandwich	sodium	6.081712295400134
33041	foothill-turkey-melt-sandwich	carbohydrates	0.2261767992934906
33042	foothill-turkey-melt-sandwich	fiber	0.01292141124735906
33043	foothill-turkey-melt-sandwich	sugar	0.02448815841233369
33044	foothill-turkey-melt-sandwich	protein	0.1161884962968173
33045	foothill-turkey-melt-sandwich	vitamin_a	0.01292141124735906
33046	foothill-turkey-melt-sandwich	vitamin_c	0.005001836611880925
33047	foothill-turkey-melt-sandwich	calcium	2.21258326625141
33048	foothill-turkey-melt-sandwich	iron	0.01917370701221021
33049	foothill-turkey-melt-sandwich	water	0.3526815836023123
33050	foothill-turkey-melt-sandwich	potassium	1.174597964356704
33051	foothill-turkey-melt-sandwich	vitamin_d	0
33052	foothill-vegan-italian-sausage-sandwich	calories	2.60238211780062
33053	foothill-vegan-italian-sausage-sandwich	fat	0.0948651609444561
33054	foothill-vegan-italian-sausage-sandwich	saturated_fat	0.03682726149686502
33055	foothill-vegan-italian-sausage-sandwich	trans_fat	0
33056	foothill-vegan-italian-sausage-sandwich	cholesterol	0
33057	foothill-vegan-italian-sausage-sandwich	sodium	6.330870413102424
33058	foothill-vegan-italian-sausage-sandwich	carbohydrates	0.3059615100731106
33059	foothill-vegan-italian-sausage-sandwich	fiber	0.02929088097957408
33060	foothill-vegan-italian-sausage-sandwich	sugar	0.05252157968751214
33061	foothill-vegan-italian-sausage-sandwich	protein	0.1216698132997692
33062	foothill-vegan-italian-sausage-sandwich	vitamin_a	0
33063	foothill-vegan-italian-sausage-sandwich	vitamin_c	0
33064	foothill-vegan-italian-sausage-sandwich	calcium	0.5806897730539433
33065	foothill-vegan-italian-sausage-sandwich	iron	0.03333100249399809
33066	foothill-vegan-italian-sausage-sandwich	water	0
33067	foothill-vegan-italian-sausage-sandwich	potassium	1.777498077057548
33068	foothill-vegan-italian-sausage-sandwich	vitamin_d	0
33069	foothill-regular-fries	calories	2.054180770536878
33070	foothill-regular-fries	fat	0.1100923461171908
33071	foothill-regular-fries	saturated_fat	0.01029719456220491
33072	foothill-regular-fries	trans_fat	0
33073	foothill-regular-fries	cholesterol	0
33074	foothill-regular-fries	sodium	4.785456855850231
33075	foothill-regular-fries	carbohydrates	0.2440654200488569
33076	foothill-regular-fries	fiber	0.01106400692322017
33077	foothill-regular-fries	sugar	0
33078	foothill-regular-fries	protein	0.02223755846944252
33079	foothill-regular-fries	vitamin_a	0
33080	foothill-regular-fries	vitamin_c	0
33081	foothill-regular-fries	calcium	0
33082	foothill-regular-fries	iron	0.006572677380130796
33083	foothill-regular-fries	water	0
33084	foothill-regular-fries	potassium	3.328294280675232
33085	foothill-regular-fries	vitamin_d	0
33086	foothill-sauteed-green-beans	calories	0.5235047539107974
33087	foothill-sauteed-green-beans	fat	0.01508860810088383
33088	foothill-sauteed-green-beans	saturated_fat	0.00179864202527092
33089	foothill-sauteed-green-beans	trans_fat	0
33090	foothill-sauteed-green-beans	cholesterol	0
33091	foothill-sauteed-green-beans	sodium	2.460442366013659
33092	foothill-sauteed-green-beans	carbohydrates	0.07774130531448756
33093	foothill-sauteed-green-beans	fiber	0.02348227088548146
33094	foothill-sauteed-green-beans	sugar	0.03387442480926901
33095	foothill-sauteed-green-beans	protein	0.01319004151865342
33096	foothill-sauteed-green-beans	vitamin_a	0
33097	foothill-sauteed-green-beans	vitamin_c	0.008493587341557123
33098	foothill-sauteed-green-beans	calcium	0.3934029807495341
33099	foothill-sauteed-green-beans	iron	0.006195322531488727
33100	foothill-sauteed-green-beans	water	0.0158880045565598
33101	foothill-sauteed-green-beans	potassium	1.141538138705277
33102	foothill-sauteed-green-beans	vitamin_d	0
33103	foothill-beef-fajitas	calories	1.257861635220126
33104	foothill-beef-fajitas	fat	0.06000909564850864
33105	foothill-beef-fajitas	saturated_fat	0.0228500438144044
33106	foothill-beef-fajitas	trans_fat	0.002994908655286014
33107	foothill-beef-fajitas	cholesterol	0.3833483078766097
33108	foothill-beef-fajitas	sodium	1.392521602165208
33109	foothill-beef-fajitas	carbohydrates	0.03571705877785542
33110	foothill-beef-fajitas	fiber	0.006988120195667365
33111	foothill-beef-fajitas	sugar	0.01209055716393243
33112	foothill-beef-fajitas	protein	0.1466396015662263
33113	foothill-beef-fajitas	vitamin_a	0.1660510465541912
33114	foothill-beef-fajitas	vitamin_c	0.1816911250873515
33115	foothill-beef-fajitas	calcium	0.2144132752099209
33116	foothill-beef-fajitas	iron	0.01319978259181613
33117	foothill-beef-fajitas	water	0.6115159783922886
33118	foothill-beef-fajitas	potassium	2.426541546038401
33119	foothill-beef-fajitas	vitamin_d	0.0005546127139418543
33120	foothill-braised-mung-bean	calories	1.06778252611586
33121	foothill-braised-mung-bean	fat	0.003476461809795143
33122	foothill-braised-mung-bean	saturated_fat	0.001102292768959436
33123	foothill-braised-mung-bean	trans_fat	0
33124	foothill-braised-mung-bean	cholesterol	0
33125	foothill-braised-mung-bean	sodium	0.04621150454483787
33126	foothill-braised-mung-bean	carbohydrates	0.1927316510649844
33127	foothill-braised-mung-bean	fiber	0.05019671686338352
33128	foothill-braised-mung-bean	sugar	0.02026522859856193
33129	foothill-braised-mung-bean	protein	0.07342965676299008
33130	foothill-braised-mung-bean	vitamin_a	0.01848460181793515
33131	foothill-braised-mung-bean	vitamin_c	0.01483855650522317
33132	foothill-braised-mung-bean	calcium	0.4061524894858228
33133	foothill-braised-mung-bean	iron	0.02068918735585402
33134	foothill-braised-mung-bean	water	0.7202211368878035
33135	foothill-braised-mung-bean	potassium	3.833774250440917
33136	foothill-braised-mung-bean	vitamin_d	0
33137	foothill-stir-fried-cabbage	calories	0.3020772094846169
33138	foothill-stir-fried-cabbage	fat	0.0009798157946306096
33139	foothill-stir-fried-cabbage	saturated_fat	0.0002939447383891828
33140	foothill-stir-fried-cabbage	trans_fat	0
33141	foothill-stir-fried-cabbage	cholesterol	0
33142	foothill-stir-fried-cabbage	sodium	1.154125024495395
33143	foothill-stir-fried-cabbage	carbohydrates	0.07211444248481284
33144	foothill-stir-fried-cabbage	fiber	0.02400548696844993
33145	foothill-stir-fried-cabbage	sugar	0.03488144228884969
33146	foothill-stir-fried-cabbage	protein	0.01234567901234568
33147	foothill-stir-fried-cabbage	vitamin_a	0.04781501077797373
33148	foothill-stir-fried-cabbage	vitamin_c	0.3495982755242014
33149	foothill-stir-fried-cabbage	calcium	0.3824221046443269
33150	foothill-stir-fried-cabbage	iron	0.004605134234763863
33151	foothill-stir-fried-cabbage	water	0.8976092494611013
33152	foothill-stir-fried-cabbage	potassium	1.624240642759161
33153	foothill-stir-fried-cabbage	vitamin_d	0
33154	foothill-forbidden-rice	calories	0.9809757236227823
33155	foothill-forbidden-rice	fat	0.009790953418404396
33156	foothill-forbidden-rice	saturated_fat	0
33157	foothill-forbidden-rice	trans_fat	0
33158	foothill-forbidden-rice	cholesterol	0
33159	foothill-forbidden-rice	sodium	0
33160	foothill-forbidden-rice	carbohydrates	0.2157251789604731
33161	foothill-forbidden-rice	fiber	0.01958190683680879
33162	foothill-forbidden-rice	sugar	0
33163	foothill-forbidden-rice	protein	0.02613082269945015
33164	foothill-forbidden-rice	vitamin_a	0
33165	foothill-forbidden-rice	vitamin_c	0
33166	foothill-forbidden-rice	calcium	0
33167	foothill-forbidden-rice	iron	0.006484075111526091
33168	foothill-forbidden-rice	water	0.7058564166407302
33169	foothill-forbidden-rice	potassium	0.7843137254901958
33170	foothill-forbidden-rice	vitamin_d	0
33171	foothill-turkey-and-bean-chili	calories	1.102689594356261
33172	foothill-turkey-and-bean-chili	fat	0.04488536155202821
33173	foothill-turkey-and-bean-chili	saturated_fat	0.01428571428571429
33174	foothill-turkey-and-bean-chili	trans_fat	0
33175	foothill-turkey-and-bean-chili	cholesterol	0.2041005291005291
33176	foothill-turkey-and-bean-chili	sodium	2.081569664902998
33177	foothill-turkey-and-bean-chili	carbohydrates	0.09391534391534391
33178	foothill-turkey-and-bean-chili	fiber	0.02861552028218695
33179	foothill-turkey-and-bean-chili	sugar	0.02041446208112875
33180	foothill-turkey-and-bean-chili	protein	0.08161375661375661
33181	foothill-turkey-and-bean-chili	vitamin_a	0
33182	foothill-turkey-and-bean-chili	vitamin_c	0
33183	foothill-turkey-and-bean-chili	calcium	0.3101851851851851
33184	foothill-turkey-and-bean-chili	iron	0.01631393298059965
33185	foothill-turkey-and-bean-chili	water	0
33186	foothill-turkey-and-bean-chili	potassium	2.734656084656085
33187	foothill-turkey-and-bean-chili	vitamin_d	0
33188	foothill-tuscan-mushroom-bean-soup	calories	0.660405643738977
33189	foothill-tuscan-mushroom-bean-soup	fat	0.02641093474426808
33190	foothill-tuscan-mushroom-bean-soup	saturated_fat	0.02200176366843034
33191	foothill-tuscan-mushroom-bean-soup	trans_fat	0
33192	foothill-tuscan-mushroom-bean-soup	cholesterol	0
33193	foothill-tuscan-mushroom-bean-soup	sodium	2.729938271604938
33194	foothill-tuscan-mushroom-bean-soup	carbohydrates	0.1940035273368607
33195	foothill-tuscan-mushroom-bean-soup	fiber	0.004409171075837742
33196	foothill-tuscan-mushroom-bean-soup	sugar	0.01318342151675485
33197	foothill-tuscan-mushroom-bean-soup	protein	0.01318342151675485
33198	foothill-tuscan-mushroom-bean-soup	vitamin_a	0
33199	foothill-tuscan-mushroom-bean-soup	vitamin_c	0
33200	foothill-tuscan-mushroom-bean-soup	calcium	0.1937830687830688
33201	foothill-tuscan-mushroom-bean-soup	iron	0.004409171075837742
33202	foothill-tuscan-mushroom-bean-soup	water	0
33203	foothill-tuscan-mushroom-bean-soup	potassium	2.28994708994709
33204	foothill-tuscan-mushroom-bean-soup	vitamin_d	0
33205	foothill-vegan-lemon-sugar-cookie	calories	2.634920634920635
33206	foothill-vegan-lemon-sugar-cookie	fat	0.1668430335097002
33207	foothill-vegan-lemon-sugar-cookie	saturated_fat	0.08324514991181657
33208	foothill-vegan-lemon-sugar-cookie	trans_fat	0
33209	foothill-vegan-lemon-sugar-cookie	cholesterol	0
33210	foothill-vegan-lemon-sugar-cookie	sodium	1.6
33211	foothill-vegan-lemon-sugar-cookie	carbohydrates	0.6
33212	foothill-vegan-lemon-sugar-cookie	fiber	0.006701940035273368
33213	foothill-vegan-lemon-sugar-cookie	sugar	0.3668430335097002
33214	foothill-vegan-lemon-sugar-cookie	protein	0.03315696649029982
33215	foothill-vegan-lemon-sugar-cookie	vitamin_a	0
33216	foothill-vegan-lemon-sugar-cookie	vitamin_c	0
33217	foothill-vegan-lemon-sugar-cookie	calcium	0.06666666666666667
33218	foothill-vegan-lemon-sugar-cookie	iron	0
33219	foothill-vegan-lemon-sugar-cookie	water	0
33220	foothill-vegan-lemon-sugar-cookie	potassium	0
33221	foothill-vegan-lemon-sugar-cookie	vitamin_d	0
33222	foothill-jasmine-rice	calories	1.385471781305115
33223	foothill-jasmine-rice	fat	0
33224	foothill-jasmine-rice	saturated_fat	0
33225	foothill-jasmine-rice	trans_fat	0
33226	foothill-jasmine-rice	cholesterol	0
33227	foothill-jasmine-rice	sodium	0
33228	foothill-jasmine-rice	carbohydrates	0.3076499118165784
33229	foothill-jasmine-rice	fiber	0.007716049382716048
33230	foothill-jasmine-rice	sugar	0
33231	foothill-jasmine-rice	protein	0.03075396825396825
33232	foothill-jasmine-rice	vitamin_a	0
33233	foothill-jasmine-rice	vitamin_c	0
33234	foothill-jasmine-rice	calcium	0
33235	foothill-jasmine-rice	iron	0
33236	foothill-jasmine-rice	water	0.5999779541446207
33237	foothill-jasmine-rice	potassium	0.1923500881834215
33238	foothill-jasmine-rice	vitamin_d	0
33239	foothill-vegan-baked-tofu-bulgogi	calories	0.9902888464437564
33240	foothill-vegan-baked-tofu-bulgogi	fat	0.04171331972161847
33241	foothill-vegan-baked-tofu-bulgogi	saturated_fat	0.002268619142754689
33242	foothill-vegan-baked-tofu-bulgogi	trans_fat	0
33243	foothill-vegan-baked-tofu-bulgogi	cholesterol	0
33244	foothill-vegan-baked-tofu-bulgogi	sodium	2.267887330127994
33245	foothill-vegan-baked-tofu-bulgogi	carbohydrates	0.05876455392361339
33246	foothill-vegan-baked-tofu-bulgogi	fiber	0.01778304682868998
33247	foothill-vegan-baked-tofu-bulgogi	sugar	0.012001727077799
33248	foothill-vegan-baked-tofu-bulgogi	protein	0.1034783054146816
33249	foothill-vegan-baked-tofu-bulgogi	vitamin_a	0
33250	foothill-vegan-baked-tofu-bulgogi	vitamin_c	0.002195437880085183
33251	foothill-vegan-baked-tofu-bulgogi	calcium	1.300284675111784
33252	foothill-vegan-baked-tofu-bulgogi	iron	0.002195437880085183
33253	foothill-vegan-baked-tofu-bulgogi	water	0.1956866963782593
33254	foothill-vegan-baked-tofu-bulgogi	potassium	2.307990662070883
33255	foothill-vegan-baked-tofu-bulgogi	vitamin_d	0.0005854501013560487
33256	foothill-sesame-spinach-banchan	calories	0.9996278497807549
33257	foothill-sesame-spinach-banchan	fat	0.08802161707360484
33258	foothill-sesame-spinach-banchan	saturated_fat	0.01423879099720078
33259	foothill-sesame-spinach-banchan	trans_fat	0
33260	foothill-sesame-spinach-banchan	cholesterol	0
33261	foothill-sesame-spinach-banchan	sodium	2.840962412827856
33262	foothill-sesame-spinach-banchan	carbohydrates	0.03494975972040192
33263	foothill-sesame-spinach-banchan	fiber	0.02103457760950116
33264	foothill-sesame-spinach-banchan	sugar	0.003883306635600213
33265	foothill-sesame-spinach-banchan	protein	0.02750675533550151
33266	foothill-sesame-spinach-banchan	vitamin_a	4.228273708396032
33267	foothill-sesame-spinach-banchan	vitamin_c	0.2533857579729139
33268	foothill-sesame-spinach-banchan	calcium	0.9756807921945535
33269	foothill-sesame-spinach-banchan	iron	0.02588871090400142
33270	foothill-sesame-spinach-banchan	water	0.8239082245198452
33271	foothill-sesame-spinach-banchan	potassium	5.052181932915877
33272	foothill-sesame-spinach-banchan	vitamin_d	0
33273	foothill-bean-sprout-banchan	calories	0.3086858476576553
33274	foothill-bean-sprout-banchan	fat	0.01877736537769705
33275	foothill-bean-sprout-banchan	saturated_fat	0.009125448594768663
33276	foothill-bean-sprout-banchan	trans_fat	0
33277	foothill-bean-sprout-banchan	cholesterol	0
33278	foothill-bean-sprout-banchan	sodium	0.9792308299770986
33279	foothill-bean-sprout-banchan	carbohydrates	0.02737634578430599
33280	foothill-bean-sprout-banchan	fiber	0.009827406178981637
33281	foothill-bean-sprout-banchan	sugar	0.007370554634236227
33282	foothill-bean-sprout-banchan	protein	0.01684698202111138
33283	foothill-bean-sprout-banchan	vitamin_a	0
33284	foothill-bean-sprout-banchan	vitamin_c	0.005615660673703792
33285	foothill-bean-sprout-banchan	calcium	0.2981564838944607
33286	foothill-bean-sprout-banchan	iron	0.006668597050023253
33287	foothill-bean-sprout-banchan	water	0.9314977142506164
33288	foothill-bean-sprout-banchan	potassium	0.3376415980064404
33289	foothill-bean-sprout-banchan	vitamin_d	0
33290	foothill-beef-bulgogi	calories	2.522357835542242
33291	foothill-beef-bulgogi	fat	0.1852966066719899
33292	foothill-beef-bulgogi	saturated_fat	0.04189982726995429
33293	foothill-beef-bulgogi	trans_fat	0.003599359709740787
33294	foothill-beef-bulgogi	cholesterol	0.4624918729167524
33295	foothill-beef-bulgogi	sodium	4.060031401249097
33296	foothill-beef-bulgogi	carbohydrates	0.03159913365782836
33297	foothill-beef-bulgogi	fiber	0.0009002856133824157
33298	foothill-beef-bulgogi	sugar	0.02729915563905927
33299	foothill-beef-bulgogi	protein	0.1788965564699248
33300	foothill-beef-bulgogi	vitamin_a	0.0302995134357377
33301	foothill-beef-bulgogi	vitamin_c	0.003200025101032547
33302	foothill-beef-bulgogi	calcium	0.1595965722115525
33303	foothill-beef-bulgogi	iron	0.01449905523492908
33304	foothill-beef-bulgogi	water	0.5404904791676582
33305	foothill-beef-bulgogi	potassium	2.145364571996196
33306	foothill-beef-bulgogi	vitamin_d	0.0008004519612053559
33307	foothill-farfalle-pasta	calories	1.483067415883953
33308	foothill-farfalle-pasta	fat	0.01640621795660555
33309	foothill-farfalle-pasta	saturated_fat	0.001312497436528444
33310	foothill-farfalle-pasta	trans_fat	0
33311	foothill-farfalle-pasta	cholesterol	0
33312	foothill-farfalle-pasta	sodium	1.725496629889394
33313	foothill-farfalle-pasta	carbohydrates	0.2933978644572959
33314	foothill-farfalle-pasta	fiber	0.01399997265630341
33315	foothill-farfalle-pasta	sugar	0.01421872222905815
33316	foothill-farfalle-pasta	protein	0.04889052951068454
33317	foothill-farfalle-pasta	vitamin_a	0
33318	foothill-farfalle-pasta	vitamin_c	0
33319	foothill-farfalle-pasta	calcium	0
33320	foothill-farfalle-pasta	iron	0.01257810043339759
33321	foothill-farfalle-pasta	water	0.5954910244315929
33322	foothill-farfalle-pasta	potassium	0
33323	foothill-farfalle-pasta	vitamin_d	0
33324	foothill-gluten-free-penne-pasta	calories	0.9685132371157779
33325	foothill-gluten-free-penne-pasta	fat	0.005121360233277959
33326	foothill-gluten-free-penne-pasta	saturated_fat	0
33327	foothill-gluten-free-penne-pasta	trans_fat	0
33328	foothill-gluten-free-penne-pasta	cholesterol	0
33329	foothill-gluten-free-penne-pasta	sodium	7.548180796819635
33330	foothill-gluten-free-penne-pasta	carbohydrates	0.2241235272088266
33331	foothill-gluten-free-penne-pasta	fiber	0.01017870346363994
33332	foothill-gluten-free-penne-pasta	sugar	0.01037075447238787
33333	foothill-gluten-free-penne-pasta	protein	0.02042142393019586
33334	foothill-gluten-free-penne-pasta	vitamin_a	0
33335	foothill-gluten-free-penne-pasta	vitamin_c	0
33336	foothill-gluten-free-penne-pasta	calcium	0.01017870346363994
33337	foothill-gluten-free-penne-pasta	iron	0
33338	foothill-gluten-free-penne-pasta	water	0.6968890937432982
33339	foothill-gluten-free-penne-pasta	potassium	0.3819894563996197
33340	foothill-gluten-free-penne-pasta	vitamin_d	0
33341	foothill-marinara-sauce	calories	0.4112328290732046
33342	foothill-marinara-sauce	fat	0.0101845641751745
33343	foothill-marinara-sauce	saturated_fat	0
33344	foothill-marinara-sauce	trans_fat	0
33345	foothill-marinara-sauce	cholesterol	0
33346	foothill-marinara-sauce	sodium	2.697294880393472
33347	foothill-marinara-sauce	carbohydrates	0.06880790918349604
33348	foothill-marinara-sauce	fiber	0.01602205827557941
33349	foothill-marinara-sauce	sugar	0.002608242044861763
33350	foothill-marinara-sauce	protein	0.01602205827557941
33351	foothill-marinara-sauce	vitamin_a	0
33352	foothill-marinara-sauce	vitamin_c	0
33353	foothill-marinara-sauce	calcium	0.1427081004545793
33354	foothill-marinara-sauce	iron	0.006831110117495094
33355	foothill-marinara-sauce	water	0
33356	foothill-marinara-sauce	potassium	2.958491690886057
33357	foothill-marinara-sauce	vitamin_d	0
33358	foothill-creamy-pesto	calories	2.584356914233457
33359	foothill-creamy-pesto	fat	0.2404964400026128
33360	foothill-creamy-pesto	saturated_fat	0.06699849761578157
33361	foothill-creamy-pesto	trans_fat	0
33362	foothill-creamy-pesto	cholesterol	0.3052949245541838
33363	foothill-creamy-pesto	sodium	6.291294010059442
33364	foothill-creamy-pesto	carbohydrates	0.05649879156051996
33365	foothill-creamy-pesto	fiber	0
33366	foothill-creamy-pesto	sugar	0
33367	foothill-creamy-pesto	protein	0.0537997256515775
33368	foothill-creamy-pesto	vitamin_a	0
33369	foothill-creamy-pesto	vitamin_c	0
33370	foothill-creamy-pesto	calcium	1.662471748644588
33371	foothill-creamy-pesto	iron	0.004499314128943758
33372	foothill-creamy-pesto	water	0
33373	foothill-creamy-pesto	potassium	1.088781762362009
33374	foothill-creamy-pesto	vitamin_d	0
33375	foothill-italian-vegetable-blend	calories	0.4708627278071723
33376	foothill-italian-vegetable-blend	fat	0
33377	foothill-italian-vegetable-blend	saturated_fat	0
33378	foothill-italian-vegetable-blend	trans_fat	0
33379	foothill-italian-vegetable-blend	cholesterol	0
33380	foothill-italian-vegetable-blend	sodium	0.7059266607877718
33381	foothill-italian-vegetable-blend	carbohydrates	0
33382	foothill-italian-vegetable-blend	fiber	0
33383	foothill-italian-vegetable-blend	sugar	0.02351557907113463
33384	foothill-italian-vegetable-blend	protein	0.02351557907113463
33385	foothill-italian-vegetable-blend	vitamin_a	0
33386	foothill-italian-vegetable-blend	vitamin_c	0
33387	foothill-italian-vegetable-blend	calcium	0.2353395061728395
33388	foothill-italian-vegetable-blend	iron	0.004225455614344504
33389	foothill-italian-vegetable-blend	water	0
33390	foothill-italian-vegetable-blend	potassium	0
33391	foothill-italian-vegetable-blend	vitamin_d	0
33392	foothill-halal-ground-beef	calories	2.580056714043642
33393	foothill-halal-ground-beef	fat	0.2079226752429367
33394	foothill-halal-ground-beef	saturated_fat	0.07357263893211605
33395	foothill-halal-ground-beef	trans_fat	0.01106615485700453
33396	foothill-halal-ground-beef	cholesterol	0.6675139191479059
33397	foothill-halal-ground-beef	sodium	2.337120033198464
33398	foothill-halal-ground-beef	carbohydrates	0.002161358370508697
33399	foothill-halal-ground-beef	fiber	0.001210360687484871
33400	foothill-halal-ground-beef	sugar	0.0002593630044610437
33401	foothill-halal-ground-beef	protein	0.1625341494622541
33402	foothill-halal-ground-beef	vitamin_a	0.03760763564685133
33403	foothill-halal-ground-beef	vitamin_c	0
33404	foothill-halal-ground-beef	calcium	0.2174326520731749
33405	foothill-halal-ground-beef	iron	0.0204032230176021
33406	foothill-halal-ground-beef	water	0.5815783103364802
33407	foothill-halal-ground-beef	potassium	2.731524708648891
33408	foothill-halal-ground-beef	vitamin_d	0.0008645433482034789
33409	foothill-pickling-brine	calories	0.1862433862433862
33410	foothill-pickling-brine	fat	0
33411	foothill-pickling-brine	saturated_fat	0
33412	foothill-pickling-brine	trans_fat	0
33413	foothill-pickling-brine	cholesterol	0
33414	foothill-pickling-brine	sodium	2.572134038800705
33415	foothill-pickling-brine	carbohydrates	0.02592592592592593
33416	foothill-pickling-brine	fiber	0
33417	foothill-pickling-brine	sugar	0.02592592592592593
33418	foothill-pickling-brine	protein	0
33419	foothill-pickling-brine	vitamin_a	0
33420	foothill-pickling-brine	vitamin_c	0
33421	foothill-pickling-brine	calcium	0.02980599647266314
33422	foothill-pickling-brine	iron	0.0001763668430335097
33423	foothill-pickling-brine	water	0.473015873015873
33424	foothill-pickling-brine	potassium	0
33425	foothill-pickling-brine	vitamin_d	0
36616	common-lays-potato-chips	22:04	0
36617	common-lays-potato-chips	20:3_n-6	0
36618	common-lays-potato-chips	20:3_n-3	1.071428571428571e-05
36619	common-lays-potato-chips	18:3_n-3_c	0.0034
36620	common-lays-potato-chips	15:01	0
36621	common-lays-potato-chips	trans_polyenoic_fat	0.0006285714285714286
36622	common-lays-potato-chips	trans_monoenoic_fat	0.0002107142857142857
36623	common-lays-potato-chips	20:3	1.071428571428571e-05
36624	common-lays-potato-chips	17:01	0.0002
36625	common-lays-potato-chips	18:3_n-6_c	0.0001785714285714286
36626	common-lays-potato-chips	22:1_c	0.0001
36627	common-lays-potato-chips	18:2_n-6_c	0.07817857142857143
36628	common-lays-potato-chips	18:1_c	0.1857892857142857
36629	common-lays-potato-chips	16:1_c	0.0006892857142857143
36630	common-lays-potato-chips	20:2_n-6_c	8.928571428571429e-05
36631	common-lays-potato-chips	24:1_c	0.0002107142857142857
36632	common-lays-potato-chips	18:2_CLAs	0.0002214285714285714
36633	common-lays-potato-chips	22:1_t	0
36634	common-lays-potato-chips	18:1_t	0.0002107142857142857
36635	common-lays-potato-chips	16:1_t	0
36636	common-lays-potato-chips	24:00:00	0.0006892857142857143
36637	common-lays-potato-chips	17:00	0.0001714285714285714
36638	common-lays-potato-chips	15:00	7.142857142857143e-05
36639	common-lays-potato-chips	polyunsaturated_fat	0.08282142857142857
36640	common-lays-potato-chips	monounsaturated_fat	0.1896285714285714
36641	common-lays-potato-chips	phytosterols	1.81
36642	common-lays-potato-chips	22:5_n-3	0
36643	common-lays-potato-chips	22:1	0.0001
36644	common-lays-potato-chips	20:5_n-3	1.071428571428571e-05
36645	common-lays-potato-chips	20:01	0.002428571428571429
36646	common-lays-potato-chips	18:04	0
36647	common-lays-potato-chips	16:1	0.0006892857142857143
36648	common-lays-potato-chips	14:01	0
36649	common-lays-potato-chips	22:00	0.001478571428571428
36650	common-lays-potato-chips	22:6_n-3	0
36651	common-lays-potato-chips	20:4	8.928571428571429e-05
36652	common-lays-potato-chips	18:3	0.003578571428571428
36653	common-lays-potato-chips	18:2	0.07903928571428571
36654	common-lays-potato-chips	18:1	0.186
36655	common-lays-potato-chips	20:00	0.001528571428571428
36656	common-lays-potato-chips	18:00	0.008021428571428572
36657	common-lays-potato-chips	16:00	0.02157142857142857
36658	common-lays-potato-chips	14:00	0.0004392857142857143
36659	common-lays-potato-chips	12:00	0
36660	common-lays-potato-chips	10:00	1.071428571428571e-05
36661	common-lays-potato-chips	8:00	2.142857142857143e-05
36662	common-lays-potato-chips	6:00	0
36663	common-lays-potato-chips	4:00	0
36664	common-lays-potato-chips	saturated_fat	0.034
36665	common-lays-potato-chips	trans_fat	0.0008392857142857143
36666	common-lays-potato-chips	cholesterol	0
36667	common-lays-potato-chips	serine	0.003028571428571429
36668	common-lays-potato-chips	proline	0.002510714285714286
36669	common-lays-potato-chips	glycine	0.002071428571428572
36670	common-lays-potato-chips	glutamic_acid	0.0117
36671	common-lays-potato-chips	aspartic_acid	0.01706071428571429
36672	common-lays-potato-chips	alanine	0.002139285714285714
36673	common-lays-potato-chips	histidine	0.001528571428571428
36674	common-lays-potato-chips	arginine	0.003210714285714285
36675	common-lays-potato-chips	valine	0.003921428571428571
36676	common-lays-potato-chips	tyrosine	0.002589285714285714
36677	common-lays-potato-chips	phenylalanine	0.0031
\.


--
-- Data for Name: Kitchen; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public."Kitchen" (id, name, description) FROM stdin;
3f581e99-d0d6-413b-a3a9-8c026d7c2dc7	Clark Kerr Campus	Dining hall at Clark Kerr Campus
f801d5f6-a5ec-4312-af0d-ff1bf735287d	Cafe 3	Dining hall at Cafe 3
d2c73808-6ea8-4fbd-8e5b-0b31c938d264	Crossroads	Dining hall at Crossroads
89c6db5c-9d46-416c-bac0-ba20d10a569d	Foothill	Dining hall at Foothill
523a95fd-c56b-4327-bbd4-94b5373d9eba	Common Foods	\N
\.


--
-- Data for Name: NutritionalMetric; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public."NutritionalMetric" (id, name, description, unit) FROM stdin;
vitamin_d_iu	Vitamin D (IU)		IU
calories	Calories	Total energy content	
protein	Protein	Protein content	g
carbohydrates	Carbohydrates	Total carbohydrates	g
fat	Fat	Total fat content	g
fiber	Fiber	Dietary fiber	g
sugar	Sugar	Total sugar content	g
sodium	Sodium	Sodium content	mg
cholesterol	Cholesterol	Cholesterol content	mg
saturated_fat	Saturated Fat	Saturated fat content	g
potassium	Potassium	Potassium content	mg
vitamin_a	Vitamin A	Vitamin A content	iu
vitamin_c	Vitamin C	Vitamin C content	mg
calcium	Calcium	Calcium content	mg
iron	Iron	Iron content	mg
water	Water	Water content	g
vitamin_d	Vitamin D	Vitamin D content	iu
trans_fat	Trans Fat	Trans fat content	g
added_sugar	Sugars, added		g
alanine	Alanine		g
alcohol	Alcohol, ethyl		g
arginine	Arginine		g
ash	Ash		g
aspartic_acid	Aspartic acid		g
betaine	Betaine		mg
caffeine	Caffeine		mg
campesterol	Campesterol		mg
carotene_alpha	Carotene, alpha		µg
carotene_beta	Carotene, beta		µg
vitamin_d3	Vitamin D3 (cholecalciferol)		µg
choline	Choline, total		mg
cryptoxanthin	Cryptoxanthin, beta		µg
copper	Copper, Cu		mg
cystine	Cystine		g
joules	Energy		kJ
vitamin_d2	Vitamin D2 (ergocalciferol)		µg
10:00	10:00		g
12:00	12:00		g
13:00	13:00		g
14:00	14:00		g
14:01	14:01		g
15:00	15:00		g
15:01	15:01		g
16:00	16:00		g
16:1	16:1 undifferentiated		g
16:1_c	16:1 c		g
16:1_t	16:1 t		g
17:00	17:00		g
17:01	17:01		g
18:00	18:00		g
18:1	18:1 undifferentiated		g
18:1_c	18:1 c		g
18:1_t	18:1 t		g
18:1-11t	18:1-11t (18:1t n-7)		g
18:2	18:2 undifferentiated		g
18:2_CLAs	18:2 CLAs		g
18:2_n-6_c	18:2 n-6 c,c		g
18:2_t	18:2 t,t		g
18:3	18:3 undifferentiated		g
18:3_n-3_c	18:3 n-3 c,c,c (ALA)		g
18:3_n-6_c	18:3 n-6 c,c,c		g
18:04	18:04		g
20:00	20:00		g
20:01	20:01		g
20:2_n-6_c	20:2 n-6 c,c		g
20:3	20:3 undifferentiated		g
20:3_n-3	20:3 n-3		g
20:3_n-6	20:3 n-6		g
20:4	20:4 undifferentiated		g
20:4_n-6	20:4 n-6		g
20:5_n-3	20:5 n-3 (EPA)		g
21:05	21:05		g
22:00	22:00		g
22:1	22:1 undifferentiated		g
22:04	22:04		g
22:5_n-3	22:5 n-3 (DPA)		g
22:6_n-3	22:6 n-3 (DHA)		g
24:00:00	24:00:00		g
24:1_c	24:1 c		g
4:00	4:00		g
6:00	6:00		g
8:00	8:00		g
monounsaturated_fat	Fatty acids, total monounsaturated		g
polyunsaturated_fat	Fatty acids, total polyunsaturated		g
trans_monoenoic_fat	Fatty acids, total trans-monoenoic		g
trans_polyenoic_fat	Fatty acids, total trans-polyenoic		g
fluoride	Fluoride, F		µg
folate	Folate, total		µg
folic_acid	Folic acid		µg
folate_dfe	Folate, DFE		µg
folate_food	Folate, food		µg
fructose	Fructose		g
galactose	Galactose		g
glutamic_acid	Glutamic acid		g
glucose	Glucose (dextrose)		g
glycine	Glycine		g
histidine	Histidine		g
hydroxyproline	Hydroxyproline		g
isoleucine	Isoleucine		g
lactose	Lactose		g
leucine	Leucine		g
lutein_zeaxanthin	Lutein + zeaxanthin		µg
lycopene	Lycopene		µg
lysine	Lysine		g
maltose	Maltose		g
methionine	Methionine		g
magnesium	Magnesium, Mg		mg
menaquinone-4	Menaquinone-4		µg
manganese	Manganese, Mn		mg
niacin	Niacin		mg
added_vitamin_e	Vitamin E, added		mg
vitamin_b12_added	Vitamin B-12, added		µg
adjusted_protein	Adjusted Protein		g
22:1_t	22:1 t		g
22:1_c	22:1 c		g
18:3i	18:3i		g
18:2_t not	18:2 t not further defined		g
18:2_i	18:2 i		g
phosphorus	Phosphorus, P		mg
pantothenic_acid	Pantothenic acid		mg
phenylalanine	Phenylalanine		g
phytosterols	Phytosterols		mg
proline	Proline		g
retinol	Retinol		µg
riboflavin	Riboflavin		mg
selenium	Selenium, Se		µg
serine	Serine		g
beta-sitosterol	Beta-sitosterol		mg
starch	Starch		g
stigmasterol	Stigmasterol		mg
sucrose	Sucrose		g
theobromine	Theobromine		mg
thiamin	Thiamin		mg
threonine	Threonine		g
vitamin_e_alpha-tocopherol	Vitamin E (alpha-tocopherol)		mg
tocopherol_beta	Tocopherol, beta		mg
tocopherol_delta	Tocopherol, delta		mg
tocopherol_gamma	Tocopherol, gamma		mg
tryptophan	Tryptophan		g
tyrosine	Tyrosine		g
valine	Valine		g
vitamin_a_iu	Vitamin A, IU		IU
vitamin_b12	Vitamin B-12		µg
vitamin_b6	Vitamin B-6		mg
vitamin_k	Vitamin K (phylloquinone)		µg
dihydrophylloquinone	Dihydrophylloquinone		µg
zinc	Zinc, Zn		mg
tocotrienol_alpha	Tocotrienol, alpha		mg
tocotrienol_beta	Tocotrienol, beta		mg
tocotrienol_gamma	Tocotrienol, gamma		mg
tocotrienol_delta	Tocotrienol,delta		mg
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public."User" (user_id, name, email) FROM stdin;
7	Boldizsar Szabo	bodiszabo@gmail.com
8	Bodi Thomas Szabo	bodiszabo@berkeley.edu
\.


--
-- Data for Name: UserPreference; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public."UserPreference" (id, user_id, metric_id, min_value, max_value) FROM stdin;
37	7	calories	800	900
38	7	protein	80	90
39	7	carbohydrates	100	125
40	7	fat	0	18
41	7	fiber	13	18
42	7	sugar	0	8
43	7	sodium	250	1150
44	7	cholesterol	0	150
45	7	saturated_fat	0	5
46	8	calories	1500	2500
47	8	protein	120	200
48	8	carbohydrates	100	300
49	8	fat	10	75
50	8	fiber	25	40
51	8	sugar	0	50
52	8	sodium	0	2300
53	8	cholesterol	0	300
54	8	saturated_fat	0	20
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bodi
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ad59024f-5b16-40b1-a780-f01497be87bb	321cc4ab6f3359af200d3ddb9d3437c75ee6c531910a15169e122c131e3dcdfe	2025-05-03 00:07:21.684384-07	20250502052425_init	\N	\N	2025-05-03 00:07:21.680441-07	1
49856f6d-cd79-43dc-9406-42cf16f0ca64	fb6711ef8f36fd26ab893fec8db32be4cfd05423d314c10df944d730924170a2	2025-05-03 00:07:21.68918-07	20250502061736_init	\N	\N	2025-05-03 00:07:21.68478-07	1
1bd48f2e-ea8e-4729-8b8c-425bc76b7856	132ab11fe7db2e0723338d571035717876027521f1f573e14e919fc4243ffec8	2025-05-03 00:07:21.694594-07	20250502175959_add_nutritional_metrics	\N	\N	2025-05-03 00:07:21.689572-07	1
a2613ff6-c4a3-4d10-aa2e-d44e551a5994	f2982689b583f5c6e04d2da8835ef0eda0504ae1e406620b857b8ef5a36dc726	2025-05-03 00:07:21.698882-07	20250502181015_change_users_to_user	\N	\N	2025-05-03 00:07:21.694995-07	1
56d8e499-2815-4a39-8ae6-0d61861aff46	6c1ff23455c50d4336ec31c9f0e9d5cc71e2e4bb80cacfcf35bd3b9843d9a5fd	2025-05-03 00:07:22.063834-07	20250503070721_init	\N	\N	2025-05-03 00:07:22.057177-07	1
c4fc65c3-b1e1-4c4c-b59c-b3e0205a4b4c	8cc651554dbd5c82f8d71f37f39ca03666d22ac007311de55f138abd0d079c63	2025-05-04 00:51:37.028663-07	20250504075136_npx	\N	\N	2025-05-04 00:51:37.020254-07	1
3dbafac4-e45f-4a49-a0ec-d2f6ffb8cbb1	c830adf83db110767ab4bf101ebe408d24e6eaa61151a024f18b59aba5f5c969	2025-05-05 13:04:15.411207-07	20250505200415_add_kitchen_table	\N	\N	2025-05-05 13:04:15.402155-07	1
6fe3e99a-8e46-43b4-a741-03994c41659a	8057f974edce5499080c57bed7c52485c7c73f46791a7e2553ded4f816625b80	2025-05-06 10:47:17.076265-07	20250506174716_add_active_food_indicator	\N	\N	2025-05-06 10:47:17.071349-07	1
2763b90c-0317-43b7-9807-c1b280a4b4d5	de8b442c2c7926cf3b2a0248e8937c602cef4da7ce53306a6839ba4018669373	2025-05-06 10:47:45.549651-07	20250506174745_remove_default_food_active_indicator	\N	\N	2025-05-06 10:47:45.547469-07	1
04a361ee-d155-4da8-9a6d-85384082912b	013671044976894abe8a723c5d2de597c94f9231f2cc3f9692059d49b393e8ec	2025-05-07 08:21:53.15699-07	20250507152152_add_update_timestamp	\N	\N	2025-05-07 08:21:53.1536-07	1
5350c8f6-70bd-47be-b218-d8141b23514c	0a7d018858a8a4288f1aaf8af3f331b9d0b3f178018edd9cc4276f002d881d6f	2025-05-09 11:19:56.330092-07	20250509181955_add_serving_sizes	\N	\N	2025-05-09 11:19:56.328281-07	1
\.


--
-- Name: FoodMacro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bodi
--

SELECT pg_catalog.setval('public."FoodMacro_id_seq"', 36956, true);


--
-- Name: UserPreference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bodi
--

SELECT pg_catalog.setval('public."UserPreference_id_seq"', 54, true);


--
-- Name: User_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bodi
--

SELECT pg_catalog.setval('public."User_user_id_seq"', 8, true);


--
-- Name: FoodMacro FoodMacro_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."FoodMacro"
    ADD CONSTRAINT "FoodMacro_pkey" PRIMARY KEY (id);


--
-- Name: Food Food_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_pkey" PRIMARY KEY (id);


--
-- Name: Kitchen Kitchen_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."Kitchen"
    ADD CONSTRAINT "Kitchen_pkey" PRIMARY KEY (id);


--
-- Name: NutritionalMetric NutritionalMetric_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."NutritionalMetric"
    ADD CONSTRAINT "NutritionalMetric_pkey" PRIMARY KEY (id);


--
-- Name: UserPreference UserPreference_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: FoodMacro_food_id_metric_id_key; Type: INDEX; Schema: public; Owner: bodi
--

CREATE UNIQUE INDEX "FoodMacro_food_id_metric_id_key" ON public."FoodMacro" USING btree (food_id, metric_id);


--
-- Name: Food_name_kitchen_id_key; Type: INDEX; Schema: public; Owner: bodi
--

CREATE UNIQUE INDEX "Food_name_kitchen_id_key" ON public."Food" USING btree (name, kitchen_id);


--
-- Name: Kitchen_name_key; Type: INDEX; Schema: public; Owner: bodi
--

CREATE UNIQUE INDEX "Kitchen_name_key" ON public."Kitchen" USING btree (name);


--
-- Name: NutritionalMetric_name_key; Type: INDEX; Schema: public; Owner: bodi
--

CREATE UNIQUE INDEX "NutritionalMetric_name_key" ON public."NutritionalMetric" USING btree (name);


--
-- Name: UserPreference_user_id_metric_id_key; Type: INDEX; Schema: public; Owner: bodi
--

CREATE UNIQUE INDEX "UserPreference_user_id_metric_id_key" ON public."UserPreference" USING btree (user_id, metric_id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: bodi
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: FoodMacro FoodMacro_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."FoodMacro"
    ADD CONSTRAINT "FoodMacro_food_id_fkey" FOREIGN KEY (food_id) REFERENCES public."Food"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: FoodMacro FoodMacro_metric_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."FoodMacro"
    ADD CONSTRAINT "FoodMacro_metric_id_fkey" FOREIGN KEY (metric_id) REFERENCES public."NutritionalMetric"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Food Food_kitchen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_kitchen_id_fkey" FOREIGN KEY (kitchen_id) REFERENCES public."Kitchen"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPreference UserPreference_metric_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_metric_id_fkey" FOREIGN KEY (metric_id) REFERENCES public."NutritionalMetric"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPreference UserPreference_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bodi
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

