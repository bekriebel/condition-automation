# Automated Conditions Foundry VTT
This module requires Combat Utility Belt for basic fuctionality 
It will automaticly set speed and vision on the actor token based on the CUB effects present on the actor. Alongside this is automatic shadow generation based on token elevation distance. 
These effects work well alongside About-Time and Dynamic Effects for auto-application. 

https://foundryvtt.com/packages/combat-utility-belt/


Module config settings can toggle use the use of the "Blinded" setting, which will restrist the tokens vision to 1 degree (closest to fully blinded possible in the Foundry System)/
Shadow settings will toggle the use of the elevation based shadow effects. 

## Condition Effects
Upon aplication of the CUB conditions for: Blinded, Stunned, Petrified, Grappled, Restrained, Unconsious, Incapacitiated, Exhaustion 1-5; the revlavent adjustments will be made to the actor/token data. Vision will be dissabled on Blinded tokens, and speed reduced on the others. 
These changes are non-permenant and will revert upon removal of the status effect.

![Speed Effects](https://github.com/kandashi/condition-automation/blob/master/Images/Speed%20Tests.gif)

## Shadows
This also includes automatic shadow creation for token elevation. This section requires Token Magic Fx to function. Changing the elevation of a token over 5ft will automaticly set a shadow effect "below" the token, this is change in distance based on the elevation value. 

![Shadow Effects](https://github.com/kandashi/condition-automation/blob/master/Images/ShadowEffects.PNG)
 
https://foundryvtt.com/packages/tokenmagic/

Many thanks to Forien for guiding me through this module, his patreon is here: https://www.patreon.com/forien

**V1.0.7** Shadow effects updated with "blulge" effect to help show token height, alonside the shadow. Working to query "flying" state before adding shadow effects.

**V1.1.2** Updated Shadow Effects to fall inline with Token Magic FX new system. Updated bulge effects to scale with elevation, alongside the shadow blur increasing with elevation too.

**V1.1.3**
Updated the conditions to include Paralyzed as an option, thanks to https://github.com/Takryn for bringing this up.

Also included image type independance, now any svg, png, webp or jpg willl register as a valid effect trigger; thanks to https://github.com/dstein766. However this does require the name of the effect to tie into the effect name; you must have the name as the linked status effect for it to register. E.g. eye.png will not registed the blinded condition, but blinded.webp will. The effects are as follows:

* petrified
* incapacitated
* restrained
* grappeled
* stunned
* unconscious
* blinded
* exhaustion 1-5
* prone
For some reason, the default conditions in DnD5e are not recognised.
