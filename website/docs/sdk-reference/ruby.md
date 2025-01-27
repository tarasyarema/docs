---
id: ruby
title: Ruby SDK Reference
description: ConfigCat Ruby SDK Reference. This is a step-by-step guide on how to use feature flags in your Ruby application.
---
[![Star on GitHub](https://img.shields.io/github/stars/configcat/ruby-sdk.svg?style=social)](https://github.com/configcat/ruby-sdk/stargazers)
[![Ruby CI](https://github.com/configcat/ruby-sdk/actions/workflows/ruby-ci.yml/badge.svg?branch=master)](https://github.com/configcat/ruby-sdk/actions/workflows/ruby-ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/configcat/ruby-sdk/badge.svg?branch=master)](https://coveralls.io/github/configcat/ruby-sdk?branch=master)
[![Gem version](https://badge.fury.io/rb/configcat.svg)](https://rubygems.org/gems/configcat)

<a href="https://github.com/configcat/ruby-sdk" target="_blank">ConfigCat Ruby SDK on GitHub</a>

## Getting started
### 1. Install *ConfigCat SDK*
```
gem install configcat
```

### 2. Import the package
```ruby
require 'configcat'
```

### 3. Create the *ConfigCat* client with your *SDK Key*
```ruby
configcat_client = ConfigCat.create_client("#YOUR-SDK-KEY#")
```

### 4. Get your setting value
```ruby
isMyAwesomeFeatureEnabled = configcat_client.get_value("isMyAwesomeFeatureEnabled", false)
if isMyAwesomeFeatureEnabled
    do_the_new_thing()
else
    do_the_old_thing()
end
```

### 5. Stop *ConfigCat* client
You can safely shut down the client instance and release all associated resources on application exit.
```ruby
configcat_client.stop()
```

## Creating the *ConfigCat Client*
*ConfigCat Client* is responsible for:
- managing the communication between your application and ConfigCat servers.
- caching your setting values and feature flags.
- serving values quickly in a failsafe way.

`create_client()` returns a client with default options.

| Properties | Description                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `sdk_key`  | **REQUIRED.** SDK Key to access your feature flags and configurations. Get it from *ConfigCat Dashboard*. |
| `data_governance`  | Optional, defaults to `DataGovernance::GLOBAL`. Describes the location of your feature flag and setting data within the ConfigCat CDN. This parameter needs to be in sync with your Data Governance preferences. [More about Data Governance](advanced/data-governance.md). Available options: `GLOBAL`, `EU_ONLY`. |

`create_client_with_auto_poll()`, `create_client_with_lazy_load()`, `create_client_with_manual_poll()`  
Creating the client is different for each polling mode.
[See below](#polling-modes) for details.

:::caution
We strongly recommend you to use the *ConfigCat Client* as a Singleton object in your application.
If you want to use multiple SDK Keys in the same application, create only one *ConfigCat Client* per SDK Key.
:::

## Anatomy of `get_value()`

| Parameters      | Description                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `key`           | **REQUIRED.** Setting-specific key. Set on *ConfigCat Dashboard* for each setting.                           |
| `default_value` | **REQUIRED.** This value will be returned in case of an error.                                               |
| `user`          | Optional, *User Object*. Essential when using Targeting. [Read more about Targeting.](advanced/targeting.md) |
```ruby
value = configcat_client.get_value(
    "keyOfMySetting", # Setting Key
    false, # Default value
    ConfigCat::User.new("435170f4-8a8b-4b67-a723-505ac7cdea92") # Optional User Object
);
```

## User Object
The [User Object](../advanced/user-object.md) is essential if you'd like to use ConfigCat's [Targeting](advanced/targeting.md) feature. 
``` ruby
user_object = ConfigCat::User.new("435170f4-8a8b-4b67-a723-505ac7cdea92")
```
``` ruby
user_object = ConfigCat::User.new("john@example.com")
```

| Parameters   | Description                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `identifier` | **REQUIRED.** Unique identifier of a user in your application. Can be any value, even an email address.                         |
| `email`      | Optional parameter for easier targeting rule definitions.                                                                       |
| `country`    | Optional parameter for easier targeting rule definitions.                                                                       |
| `custom`     | Optional dictionary for custom attributes of a user for advanced targeting rule definitions. e.g. User role, Subscription type. |
``` ruby
user_object = ConfigCat::User.new("435170f4-8a8b-4b67-a723-505ac7cdea92", email: 'john@example', country: 'United Kingdom',
                custom: {'SubscriptionType': 'Pro', 'UserRole': 'Admin'})
```

## Polling Modes
The *ConfigCat SDK* supports 3 different polling mechanisms to acquire the setting values from *ConfigCat*. After latest setting values are downloaded, they are stored in the internal cache then all `get_value()` calls are served from there. With the following polling modes, you can customize the SDK to best fit to your application's lifecycle.  
[More about polling modes.](/advanced/caching/)

### Auto polling (default)
The *ConfigCat SDK* downloads the latest values and stores them automatically every 60 seconds.

Use the `poll_interval_seconds` option parameter to change the polling interval.
```ruby
ConfigCat.create_client_with_auto_poll(
    "#YOUR-SDK-KEY#", poll_interval_seconds: 95);
```
Adding a callback to `on_configuration_changed_callback` option parameter will get you notified about changes.
```ruby
def configuration_changed_callback()
    # Configuration changed.
end

ConfigCat.create_client_with_auto_poll("#YOUR-SDK-KEY#", on_configuration_changed_callback: method(:configuration_changed_callback));
```

Available options:

| Option Parameter                    | Description                                                                                          | Default |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| `poll_interval_seconds`             | Polling interval.                                                                                    | 60      |
| `max_init_wait_time_seconds`        | Maximum waiting time between the client initialization and the first config acquisition in secconds. | 5       |
| `on_configuration_changed_callback` | Callback to get notified about changes.                                                              | -       |
| `config_cache_class`                | Custom cache implementation.                                                                         | nil     |
| `base_url`                          | Obsolete Optional, sets the CDN base url from where the sdk will download the configurations.        | nil     |
| `open_timeout`                      | The number of seconds to wait for the server to make the initial connection.                         | 10      |
| `read_timeout`                      | The number of seconds to wait for the server to respond before giving up.                            | 30      |
| `flag_overrides`                    | Local feature flag & setting overrides. [More about feature flag overrides](#flag-overrides)         | nil     |

### Lazy loading
When calling `get_value()` the *ConfigCat SDK* downloads the latest setting values if they are not present or expired in the cache. In this case the `get_value()` will return the setting value after the cache is updated.

Use `cache_time_to_live_seconds` option parameter to set cache lifetime.
```ruby
ConfigCat.create_client_with_lazy_load(
    "#YOUR-SDK-KEY#", cache_time_to_live_seconds: 600);
```

Use a custom `config_cache_class` option parameter.
```ruby
class InMemoryConfigCache < ConfigCat::ConfigCache
    def initialize()
        @_value = {}
    end

    def get(key)
       return @_value.fetch(key, nil)
    end

    def set(key, value)
       @_value[key] = value
    end
end

ConfigCat.create_client_with_lazy_load("#YOUR-SDK-KEY#", config_cache_class: InMemoryConfigCache);
```
Available options:

| Option Parameter             | Description                                                                                   | Default |
| ---------------------------- | --------------------------------------------------------------------------------------------- | ------- |
| `cache_time_to_live_seconds` | Cache TTL.                                                                                    | 60      |
| `config_cache_class`         | Custom cache implementation.                                                                  | nil     |
| `base_url`                   | Obsolete Optional, sets the CDN base url from where the sdk will download the configurations. | nil     |
| `open_timeout`               | The number of seconds to wait for the server to make the initial connection.                  | 10      |
| `read_timeout`               | The number of seconds to wait for the server to respond before giving up.                     | 30      |
| `flag_overrides`             | Local feature flag & setting overrides. [More about feature flag overrides](#flag-overrides)  | nil     |

### Manual polling
Manual polling gives you full control over when the `config.json` (with the setting values) is downloaded. *ConfigCat SDK* will not update them automatically. Calling `force_refresh()` is your application's responsibility.

```ruby
configcat_client = ConfigCat.create_client_with_manual_poll("#YOUR-SDK-KEY#");
configcat_client.force_refresh();
```

Available options:

| Option Parameter     | Description                                                                                   | Default |
| -------------------- | --------------------------------------------------------------------------------------------- | ------- |
| `config_cache_class` | Custom cache implementation.                                                                  | nil     |
| `base_url`           | Obsolete Optional, sets the CDN base url from where the sdk will download the configurations. | nil     |
| `open_timeout`       | The number of seconds to wait for the server to make the initial connection.                  | 10      |
| `read_timeout`       | The number of seconds to wait for the server to respond before giving up.                     | 30      |
| `flag_overrides`     | Local feature flag & setting overrides. [More about feature flag overrides](#flag-overrides)  | nil     |

> `get_value()` returns `default_value` if the cache is empty. Call `force_refresh()` to update the cache.
```ruby
configcat_client = ConfigCat.create_client_with_manual_poll("#YOUR-SDK-KEY#");
value = configcat_client.get_value("key", "my default value") # Returns "my default value"
configcat_client.force_refresh();
value = configcat_client.get_value("key", "my default value") # Returns "value from server"
```

## Flag Overrides

With flag overrides you can overwrite the feature flags & settings downloaded from the ConfigCat CDN with local values.
Moreover, you can specify how the overrides should apply over the downloaded values. The following 3 behaviours are supported:

- **Local/Offline mode** (`ConfigCat::OverrideBehaviour::LOCAL_ONLY`): When evaluating values, the SDK will not use feature flags & settings from the ConfigCat CDN, but it will use all feature flags & settings that are loaded from local-override sources.

- **Local over remote** (`ConfigCat::OverrideBehaviour::LOCAL_OVER_REMOTE`): When evaluating values, the SDK will use all feature flags & settings that are downloaded from the ConfigCat CDN, plus all feature flags & settings that are loaded from local-override sources. If a feature flag or a setting is defined both in the downloaded and the local-override source then the local-override version will take precedence.

- **Remote over local** (`ConfigCat::OverrideBehaviour::REMOTE_OVER_LOCAL`): When evaluating values, the SDK will use all feature flags & settings that are downloaded from the ConfigCat CDN, plus all feature flags & settings that are loaded from local-override sources. If a feature flag or a setting is defined both in the downloaded and the local-override source then the downloaded version will take precedence.

You can set up the SDK to load your feature flag & setting overrides from a file or a hash.


### JSON File

The SDK can be configured to load your feature flag & setting overrides from a file. 

#### File
```ruby
configcat_client = ConfigCat::ConfigCatClient.new(
    "#YOUR-SDK-KEY#",
    flag_overrides: ConfigCat::LocalFileDataSource.new(
        "path/to/the/local_flags.json",  # path to the file
        ConfigCat::OverrideBehaviour::LOCAL_ONLY  # local/offline mode
    )
)
```

#### JSON File Structure
The SDK supports 2 types of JSON structures to describe feature flags & settings.

##### 1. Simple (key-value) structure
```json
{
  "flags": {
    "enabledFeature": true,
    "disabledFeature": false,
    "intSetting": 5,
    "doubleSetting": 3.14,
    "stringSetting": "test"
  }
}
```

##### 2. Complex (full-featured) structure
This is the same format that the SDK downloads from the ConfigCat CDN. 
It allows the usage of all features you can do on the ConfigCat Dashboard.

You can download your current config.json from ConfigCat's CDN and use it as a baseline.

The URL to your current config.json is based on your [Data Governance](advanced/data-governance.md) settings: 

- GLOBAL: `https://cdn-global.configcat.com/configuration-files/{YOUR-SDK-KEY}/config_v5.json`
- EU: `https://cdn-eu.configcat.com/configuration-files/{YOUR-SDK-KEY}/config_v5.json`

```json
{
    "f": { // list of feature flags & settings
        "isFeatureEnabled": { // key of a particular flag
            "v": false, // default value, served when no rules are defined
            "i": "430bded3", // variation id (for analytical purposes)
            "t": 0, // feature flag's type, possible values: 
                    // 0 -> BOOLEAN 
                    // 1 -> STRING
                    // 2 -> INT
                    // 3 -> DOUBLE
            "p": [ // list of percentage rules
                { 
                    "o": 0, // rule's order
                    "v": true, // value served when the rule is selected during evaluation
                    "p": 10, // % value
                    "i": "bcfb84a7" // variation id (for analytical purposes)
                },
                {
                    "o": 1, // rule's order
                    "v": false, // value served when the rule is selected during evaluation
                    "p": 90, // % value
                    "i": "bddac6ae" // variation id (for analytical purposes)
                }
            ],
            "r": [ // list of targeting rules
                {
                    "o": 0, // rule's order
                    "a": "Identifier", // comparison attribute
                    "t": 2, // comparator, possible values:
                        // 0  -> 'IS ONE OF',
                        // 1  -> 'IS NOT ONE OF',
                        // 2  -> 'CONTAINS',
                        // 3  -> 'DOES NOT CONTAIN',
                        // 4  -> 'IS ONE OF (SemVer)',
                        // 5  -> 'IS NOT ONE OF (SemVer)',
                        // 6  -> '< (SemVer)',
                        // 7  -> '<= (SemVer)',
                        // 8  -> '> (SemVer)',
                        // 9  -> '>= (SemVer)',
                        // 10 -> '= (Number)',
                        // 11 -> '<> (Number)',
                        // 12 -> '< (Number)',
                        // 13 -> '<= (Number)',
                        // 14 -> '> (Number)',
                        // 15 -> '>= (Number)',
                        // 16 -> 'IS ONE OF (Sensitive)',
                        // 17 -> 'IS NOT ONE OF (Sensitive)'
                    "c": "@example.com", // comparison value
                    "v": true, // value served when the rule is selected during evaluation
                    "i": "bcfb84a7" // variation id (for analytical purposes)
                }
            ]
        },
    }
}
```

### Hash
You can set up the SDK to load your feature flag & setting overrides from a hash.

```ruby
dictionary = {
    "enabledFeature" => true,
    "disabledFeature" => false,
    "intSetting" => 5,
    "doubleSetting" => 3.14,
    "stringSetting" => "test"
}

configcat_client = ConfigCat::ConfigCatClient.new(
    "#YOUR-SDK-KEY#",
    flag_overrides: ConfigCat::LocalDictionaryDataSource.new(dictionary, ConfigCat::OverrideBehaviour::LOCAL_ONLY)
)
```

## Logging
In the *ConfigCat SDK* there is a default logger writes logs to the standard output. The following example shows how to configure the *Log Level* of the default logger. 

```ruby
ConfigCat.logger.level = Logger::INFO
```

Available log levels:

| Level | Description                                                                             |
| ----- | --------------------------------------------------------------------------------------- |
| ERROR | Only error level events are logged.                                                     |
| WARN  | Default. Errors and Warnings are logged.                                                         |
| INFO  | Errors, Warnings and feature flag evaluation is logged.                                 |
| DEBUG | All of the above plus debug info is logged. Debug logs can be different for other SDKs. |

Info level logging helps to inspect the feature flag evaluation process:
```bash
INFO -- : Evaluating get_value('isPOCFeatureEnabled').
User object:
{
    "Identifier" : "435170f4-8a8b-4b67-a723-505ac7cdea92",
    "Email" : "john@example.com"
}
Evaluating rule: [Email] [CONTAINS] [@something.com] => no match
Evaluating rule: [Email] [CONTAINS] [@example.com] => match, returning: true
```

You can easily replace the default logger with your own one. The following example shows how to set a logger writes logs into a text file.

```ruby
ConfigCat.logger = Logger.new('log.txt')
```

## `get_all_keys()`
You can query the keys from your configuration in the SDK with the `get_all_keys()` method.

```ruby
configcat_client = ConfigCat.create_client("#YOUR-SDK-KEY#")
keys = configcat_client.get_all_keys()
```

## `get_all_values()`

Evaluates and returns the values of all feature flags and settings. Passing a [User Object](#user-object) is optional.

| Parameters     | Description                                                                                                  | 
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `user`         | Optional, *User Object*. Essential when using Targeting. [Read more about Targeting.](advanced/targeting.md) |

```ruby
configcat_client = ConfigCat.create_client("#YOUR-SDK-KEY#")
setting_values = configcat_client.get_all_values(ConfigCat::User.new("435170f4-8a8b-4b67-a723-505ac7cdea92"))  # Optional User Object
```

## Using ConfigCat behind a proxy
Provide your own network credentials (username/password), and proxy server settings (proxy server/port) by passing the proxy details to the creator method.

```ruby
configcat_client = ConfigCat::create_client_with_auto_poll("#YOUR-SDK-KEY#",
                                                           proxy_address: "127.0.0.1",
                                                           proxy_port: 8080,
                                                           proxy_user: "user",
                                                           proxy_pass: "password")
```

## Sample Applications
- <a href="https://github.com/configcat/ruby-sdk/tree/master/samples/consolesample.rb" target="_blank">Sample Console App</a>

## Look under the hood
* <a href="https://github.com/configcat/ruby-sdk" target="_blank">ConfigCat's Ruby SDK on GitHub</a>
* <a href="https://rubygems.org/gems/configcat" target="_blank">ConfigCat's Ruby SDK in RubyGems</a>
