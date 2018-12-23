import ItemActions from '../actions/ItemActions';
import alt from "../alt";
import PerkStore from './PerkStore';

class ItemStore {
    constructor() {
        this.items = [];
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateItems: ItemActions.UPDATE_ITEMS,
            handleFetchItems: ItemActions.FETCH_ITEMS,
            handleItemsFailed: ItemActions.ITEMS_FAILED
        })        
    }

    handleUpdateItems(items) {
        this.waitFor(PerkStore);
        let allPerks = PerkStore.getState().perks;
        this.items = items.map((item) => {
            let primaryPerkNames = [];
            let secondaryPerkNames = [];
            if (item.type === "Warlock Bond" ||
                item.type === "Hunter Cloak" ||
                item.type === "Titan Mark") {
                if (item.perks[0]) primaryPerkNames = item.perks[0];
                if (item.perks[1]) secondaryPerkNames = item.perks[1];
            } else {
                if (item.perks[2]) primaryPerkNames = item.perks[2];
                if (item.perks[3]) secondaryPerkNames = item.perks[3];
            }
            let primaryPerks = primaryPerkNames.filter(name => !(name === ""))
                            .map(perkName => allPerks.get(perkName.toLowerCase()));
            let secondaryPerks = secondaryPerkNames.filter(name => !(name === ""))
                            .map(perkName => allPerks.get(perkName.toLowerCase()));

            return {
                name: item.item,
                class: item.class,
                type: item.type,
                power: item.power,
                primaryPerks: primaryPerks,
                secondaryPerks: secondaryPerks
            };
        });
        this.errorMessage = null;
    }

    handleFetchItems() {
        this.items = [];
    }

    handleItemsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

export default alt.createStore(ItemStore, 'ItemStore');