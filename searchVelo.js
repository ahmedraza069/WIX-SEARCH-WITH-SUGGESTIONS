import wixData from 'wix-data';

$w.onReady(function () {

    $w('#dataset1').onReady(() => {
        console.log("Dataset1 is ready");
    });

    $w('#html1').onMessage((event) => {
        let receivedData = event.data;

        // 1. Live Suggestion (typing)
        if (receivedData.type === 'typing') {
            let searchValue = receivedData.value;

            if (searchValue && searchValue.trim().length > 0) {
                wixData.query("Search")
                    .startsWith("title", searchValue)
                    .limit(8)
                    .find()
                    .then((results) => {
                        let titleArray = results.items.length > 0
                            ? results.items.map(item => item.title)
                            : [];

                        $w('#html1').postMessage({
                            type: 'updateSuggestions',
                            titles: titleArray
                        });
                    })
                    .catch((err) => console.log("Query Error: ", err));
            } else {
                $w('#html1').postMessage({ type: 'updateSuggestions', titles: [] });
            }
        }


        if (receivedData.type === 'search') {
            let finalSearchValue = receivedData.value;

            if (finalSearchValue && finalSearchValue.trim().length > 0) {
                let newFilter = wixData.filter().contains("title", finalSearchValue);

                $w('#dataset1').setFilter(newFilter)
                    .then(() => {
                        console.log("Filtered for: ", finalSearchValue);

                    })
                    .catch((err) => console.log("Filter error: ", err));
            } else {
                $w('#dataset1').setFilter(wixData.filter());
            }
        }
    });
});