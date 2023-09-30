import { isRef, shallowRef, watchEffect } from 'vue';
import { useDb } from '~/composables/useDb.js';

export function useFishesInMap(mapRef, fishesInMapRef = null) {
  const db = useDb();
  const fishesInMap = isRef(fishesInMapRef) ? fishesInMapRef : shallowRef([]);

  const fetchFishesInMap = function () {
    if (mapRef.value.id) {
      db.mapFishes
        .where('mapId')
        .equals(mapRef.value.id)
        .toArray()
        .then((data) => {
          return (fishesInMap.value = data.map((d) => ({
            id: d.fishId,
            name: d.fishName,
          })));
        });
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
      return f.id === fish.id;
    });
  };

  watchEffect(() => {
    if (mapRef.value?.id) {
      fetchFishesInMap();
    }
  });

  return {
    fishesInMap,
    fetchFishesInMap,
    addFishInMap,
    removeFishFromMap,
    fishInMap,
  };
}
