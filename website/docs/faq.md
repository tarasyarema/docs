---
id: faq
title: FAQ - Frequently Asked Questions
description: This is a collection of frequently asked questions and the most typical answers from the ConfigCat Support Team.
---

export const FaqSchema = require('@site/src/schema-markup/faq.json');

<script type='application/ld+json' dangerouslySetInnerHTML={ { __html: JSON.stringify(FaqSchema) }}></script>

A collection of frequently asked questions.

## General
### Learning how ConfigCat can work with your product
You can book a free demo session [here](https://calendly.com/configcat/demo), where we'll show you how to use ConfigCat, as well as answer your questions.

## Billing, Payments & Subscriptions

### What if I exceed the [config.json download](/requests) limit of my plan?
Don't worry, we will keep serving your data and feature flags. Someone from our team will contact you to discuss your options.
You can always check your Usage & Quota [here](https://app.configcat.com/organization/usage).

### Where can I find and download my invoices?
All the invoices we issued are available for download from the [Billing & Invoices page.](https://app.configcat.com/organization/billing).
You need to have a [Billing Manager](organization.md/#billing-manager-role) role to access the Billing & Invoices page.

### Is it possible to pay via wire transfer?
Using a credit card via the ConfigCat Dashboard is the preferred way of payment, but a wire transfer is also an option in our larger subscription plans. [Contact us](https://configcat.com/support/) directly for this process. 

### How do I upgrade / downgrade my billing plan?
You can change your billing plan on the [Plans](https://app.configcat.com/organization/plans) page.
You need to have a [Billing Manager](organization.md/#billing-manager-role) role to access the Plans page.

### Can I get a discounted rate?
This is possible if you join our partnership program or via [referrals](https://configcat.com/referrals/). [Contact us](https://configcat.com/support/) directly for more information.

### How do I change the billing email address the way I receive my invoices?
Go to the [Billing & Invoices page.](https://app.configcat.com/organization/billing) And click the `Update billing details` link.
You need to have a [Billing Manager](organization.md/#billing-manager-role) role to access the Billing & Invoices page.

### How do I change my payment method or billing information?
Go to the [Billing & Invoices page.](https://app.configcat.com/organization/billing) and click the `Update billing details` link.
You need to have a [Billing Manager](organization.md/#billing-manager-role) role to access the Billing & Invoices page.

### The ChargeBee payment gets stuck | Throws an error
If you're using Firefox, try switching to a Chromium-based browser that has extensions turned off. If this doesn't work, [contact us](https://configcat.com/support/) for help. 

### How do I cancel my account?
Go to the [Plans](https://app.configcat.com/organization/plans) page and click the `Switch Plan` button under the Free plan.
You need to have a [Billing Manager](organization.md/#billing-manager-role) role to access the Plans page.

### How do I change my currency?
Go to the [Plans](https://app.configcat.com/organization/plans) page and use the currency toggle to switch between USD and EUR.
You need to have a [Billing Manager](organization.md#billing-manager-role) role to access the Plans page.

## Security
### Are you ISO certified? 
We can proudly say that as of 2022 May 31, ConfigCat has achieved the ISO/IEC 27001:2013 certification for Information Security Management Systems (ISMS). Click [here](https://configcat.com/iso/) to learn more.

### I'm configuring my firewall, which addresses should I whitelist?
If possible, you can allow the whole "configcat.com" domain. Alternatively, you can manually whitelist the following addresses:
- Global CDN: https://cdn-global.configcat.com
- EU CDN: https://cdn-eu.configcat.com
- The Public Management API: https://api.configcat.com
- The Dashboard URL: https://app.configcat.com

### I can't log in to ConfigCat, because I forgot my 2FA (Two-factor authentication) code.

*Solution 1:* There might be an authenticator app on your phone that you can use to log in to ConfigCat.

*Solution 2:* Contact your `Organization Admin`, and ask them to disable 2FA for your account until you set it up again. After he re-enables the 2FA, new recovery codes will also be (re)generated.

*Solution 3:* Use your recovery codes that you received when you first set your 2FA up. 


### The Audit log doesn't show old operations
There is a 7-day log retention in the free plan and a longer, 35 day in the all the other plans.

### Is there a way to allow a group access to only one config rather than all of them?
Config access can't be specified in one Product, but you can split your configs into multiple products, each with the necessary permission settings.

### I cannot access my account using google sign-in.
Browser extensions can interfere with this. Please disable all browser extensions and try again. 

## Privacy
### How can I be sure, that my data is safe?
The feature flag evaluation is done on the client-side in the ConfigCat SDK. So if you are using the SDK, you can be sure that your data will never leave your system.

See our the architecture explained [here](https://configcat.com/architecture/).


### Can we sign a data processing agreement with you?
Yes, we have no trouble signing a data processing agreement (DPA).

### Which data do you process | store from browsers accessing the CDN to pull feature toggles?
We don't store anything from browsers. The data flow is one directional - the SDKs are only downloading the config.json files and the feature flag evaluation happens in the SDK. ConfigCat doesn't know anything about your users, only those data which you set in your targeting rules.

### Is data hosted only within the EU?
Our main infrastructure and database is in the EU, but CDN servers are located both in the EU and globally. You can set where you want us to keep your data, so its always within reach for your needs.

You can read more [here](https://configcat.com/docs/advanced/data-governance).

### Is it possible to export the feature flags?
Yes! You can export and download your current product as a standard JSON file anytime you want. The export will include:

- All feature flags and settings together with their values, targeting rules, % options, segments, tags
- All configs
- All environments
- All tags
- All segments


## A/B Testing & Targeting
### Can I use AND operators in my targeting rules?
Although there is no direct support for `AND` operators in the UI, you can use the `AND` operator with a combination of `OR` and `NOT` operators.

#### OR Example
Turn a feature `ON` if a user is in `Germany` `OR` logged in with an account from `@mycompany.com`.

```
IF Country IS ONE OF Germany THEN feature is ON
ELSE IF Email CONTAINS @mycompany.com THEN feature is ON
To all other users the feature is OFF
```
![OR example](/assets/faq/or-example.png)

#### AND Example
Turn a feature `ON` if a user is in `Germany` `AND` logged in with an account from `@mycompany.com`.
```
IF Country IS NOT ONE OF Germany THEN feature is OFF
ELSE IF Email DOES NOT CONTAIN @mycompany.com THEN feature is OFF
To all other users the feature is ON
```
![AND example](/assets/faq/and-example.png)

[Here is an example in our blog.](https://configcat.com/blog/2019/10/23/user-segmentation-and-targeting/#everyone-in-my-company-plus-android-users-from-germany-above-v53)

### Are percentage options sticky?
Yes. The percentage-based targeting is sticky by design and consistent across all SDKs.

Also, consider the following:
- All SDKs evaluate the rules in the exact same way. (10% is the same 10% in all SDKs)
- The percentage rules are sticky by feature flag. (10% is a different 10% for each feature flag)

[More on stickiness and consistency](advanced/targeting.md/#stickiness--consistency)

### How to use targeting rules based on sensitive data?
If you want to use targeting rules based on email address, phone number, or other sensitive data, you can use the [Sensitive text comparators](advanced/targeting.md/#sensitive-text-comparators).



## Technical Debt
### What are Zombie (Stale) Flags?
Zombie (Stale) flags are feature flags that are not changed in the last (configurable) number of days. Most of the time if a feature flag isn't changed for a long time it means it is time to be removed from your source code and from the [ConfigCat Dashboard](https://app.configcat.com/) as well to avoid technical debt.

### What is the Zombie (Stale) Flags Report?
The [Zombie (Stale) Flags Report](https://app.configcat.com/my-account/zombie-flags-report) is a list of all feature flags that are not changed in the last (configurable) number of days. You can use this report to identify and remove stale feature flags from your source code. This report is weekly emailed to you. You can set your [email preferences here](https://app.configcat.com/my-account/zombie-flags-report).

### I am not getting the Zombie Feature Flag email report. What am I doing wrong?
You can change the frequency, criteria and scope of the Zombie Feature Flag report from the dashboard. 

**Note:** Please be aware that feature flags are only treated as zombie flags if they haven't been modified (with save & publish) in the past configured timeframe. It currently doesn't have any connection with your real usage in your code. 

### How to avoid technical debt caused by feature flags?
The [ConfigCat CLI](/advanced/code-references/overview) can scan your code, upload code references to the [ConfigCat Dashboard](https://app.configcat.com/) and notify you about stale feature flags.
![Code references screenshot](/assets/cli/code-refs.png)

### Is there a way to compare flag statuses between two or more environments?
Yes, you can see the state of all your Feature Flags across all your environments in our simplified [overview](https://app.configcat.com/overview).

## Joining an Organization
### Is there an expiration date for sent invitations?
Invitations are valid for 14 days by default, but you can re-send them anytime to extend their expiration.

### I can't see the organization that I just joined
If you created a new account before joining an organization via an invite (like that's send by your company via email), then it is likely that a duplicate organization is created for you by ConfigCat.

Once you find the proper organization where you are supposed to be, we recommend deleting the duplicate from [here](https://app.configcat.com/organization/preferences), but please make sure that you don't accidentally delete the one that you want to keep.

## Technical Ones

### Is it possible to rename a product or config?
Yes, you can rename almost everything within ConfigCat. Organizations, products, configs, environments, tags and feature flags can all be renamed. What you can't rename is feature flag keys, as that could cause a tsunami of reference error messages in your applications.

### Can I change my Feature Flag based on a date
There is no explicit way to do this in ConfigCat, but you can create a text setting anytime with some your desired start date as a value and in your code you can filter for it. This [guide](https://configcat.com/blog/2020/11/04/enable-my-feature-automatically/) should help get things started rolling in the right direction.

### Does ConfigCat guarantee % distribution?
ConfigCat guarantees % distribution across all SDKs, and it guarantees that each user will receive the same experience every time.

### Is it possible to set up ABC test (33%/33%/33%) distribution with ConfigCat?
Yes, it is possible. All you have to do is to create a text setting and apply the percentage rules. With a normal feature flag you have only two options - true or false, but with a text setting you can apply as many A/B/n options as you want with the percentages.

### Is there a way to create feature flags via the API?
Yes there is. We have a public management API at https://api.configcat.com.


