$w.onReady(function () {
    $w("#repeater2").forEachItem(($item, itemData, index) => {
        let totalItems = $w("#repeater2").data.length;

        if (index === totalItems - 1) {
            $item("#line2").collapse();
        } else {
            $item("#line2").expand();
        }
    });
});