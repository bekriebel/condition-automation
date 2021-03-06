console.log("ConditionsV1.0.7 active");
const scope = 'condition-automation';

function getEffect(path) {
  const effectRegExp = new RegExp("([a-z-_]+)([0-9]+)?\.svg", 'i');
  let match = path.match(effectRegExp);
  if (!match) return undefined;

  let name = match[1];
  let level = match[2];

  return [name, level];
}

function getEffects(effects) {
  return effects.map(getEffect).filter(e => Array.isArray(e));
}

function getHighestEffect(effects, effect) {
  return Math.max(...(effects.filter(e => e[0] === effect).map(e => e[1])));
}

function hasEffect(effects, effect) {
  if (Array.isArray(effect)) {
    return effects.find(e => effect.includes(e[0])) ? true : false;
  }
  return effects.find(e => e[0] === effect) ? true : false;
}

/**
 * Calculates new speed based o
 *
 * @param {Array} effects
 * @param currentSpeed
 * @return {number}
 */
function getNewSpeed(effects, currentSpeed) {
  let newSpeed = currentSpeed;

  let speedEffects = ['petrified', 'incapacitated', 'restrained', 'grappled', 'stunned', 'unconscious', 'net', 'sleep', 'daze'];
  if (hasEffect(effects, speedEffects)) {
    return 0;
  }

  let hasExhaustion = hasEffect(effects, 'exhaustion');
  if (hasExhaustion) {
    let exhaustionLevel = getHighestEffect(effects, 'exhaustion');
    switch (exhaustionLevel) {
      case 5:
        return 0;
      case 4:
      case 3:
      case 2:
        newSpeed = newSpeed / 2;
        break;
      case 1:
      default:
    }
  }

  let hasProne = hasEffect(effects, 'prone');
  if (hasProne) {
    newSpeed = newSpeed / 2;
  }

  return newSpeed;
}

Hooks.on("preUpdateToken", async (scene, token, updateData, options) => {
  let effects = getProperty(updateData, 'effects');
  if (!effects) return;

  const actor = game.actors.get(token.actorId);
  effects = getEffects(effects);

  const blinded = hasEffect(effects, ['blind', 'blinded']);
  if(blinded) {
    updateData.sightAngle = 1
  } else if(!blinded){
    updateData.sightAngle = 0
  }

  let originalSpeed = actor.getFlag(scope, 'originalSpeed');
  const hasOriginalSpeedFlag = !!originalSpeed;

  let currentSpeed = parseInt(actor.data.data.attributes.speed.value);
  if (!hasOriginalSpeedFlag) {
    originalSpeed = currentSpeed;
  }

  let newSpeed = getNewSpeed(effects, originalSpeed);

  if (newSpeed !== currentSpeed) {
    await actor.update({ 'data.attributes.speed.value': `${newSpeed} ft` });
  }

  if (hasOriginalSpeedFlag && originalSpeed === newSpeed) {
    await actor.unsetFlag(scope, 'originalSpeed');
  } else {
    await actor.setFlag(scope, 'originalSpeed', originalSpeed);
  }

  //additions over standard
  let hasStunned = hasEffect(effects, 'stunned');
  if (hasStunned) {
    console.log(stunned);
    let params =
      [{
        filterType: "bevel",
        autoDestroy: true,
        rotation: 0,
        thickness: 6,
        lightColor: 0x00FF00,
        lightAlpha: 0.7,
        shadowColor: 0xFF0000,
        shadowAlpha: 0.4,
        animated:
        {
          rotation:
          {
            active: true,
            clockWise: true,
            loopDuration: 1000,
            animType: "chaoticOscillation",
            loops: 2,
            animType: "rotation"
          }
        }
      }];

    TokenMagic.addFiltersOnTargeted(params);
  }
  
});
