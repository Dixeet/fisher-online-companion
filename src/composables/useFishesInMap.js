import { isRef, shallowRef } from 'vue';
import { useDb } from '~/composables/useDb.js';

const db = useDb();

export function useFishesInMap(mapRef, fishesInMapRef = null) {
  const fishesInMap = isRef(fishesInMapRef) ? fishesInMapRef : shallowRef([]);

  const fetchFishesInMap = function () {
    if (mapRef.value.id) {
      db.mapFishes
        .where('mapId')
        .equals(mapRef.value.id)
        .toArray()
        .then((data) => (fishesInMap.value = data));
    }
  };

  const addFishInMap = function (fish) {
    db.mapFishes.add({
      id: `${mapRef.value.id}-${fish.id}`,
      mapId: mapRef.value.id,
      mapName: mapRef.value.name,
      fishId: fish.id,
      fishName: fish.name,
    });
    fetchFishesInMap();
  };

  const removeFishFromMap = function (fish) {
    db.mapFishes.delete(`${mapRef.value.id}-${fish.id}`);
    fetchFishesInMap();
  };

  const fishInMap = function (fish) {
    return fishesInMap.value.some((f) => {
      return f.fishId === fish.id;
    });
  };

  return {
    fishesInMap,
    fetchFishesInMap,
    addFishInMap,
    removeFishFromMap,
    fishInMap,
  };
}
