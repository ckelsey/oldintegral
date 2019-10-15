// function RenderGallery(galleryData) {
    //     console.log('render?')
    //     galleryData.done = true
    //     var galleryItems = galleryData.gallery.querySelectorAll('.gallery-items')
    //     var container = galleryData.itemContainerNext
    //     var columns = container.querySelectorAll('.gallery-column-inner')

    //     galleryData.columns.forEach(function (column, index) {
    //         column.items.forEach(function (item) {
    //             columns[index].appendChild(item.itemElement)
    //         })
    //     })

    //     galleryData.gallery.appendChild(container)

    //     // if (currentContainer) {
    //     //     galleryData.gallery.removeChild(currentContainer)
    //     // }

    //     requestAnimationFrame(function () {
    //         galleryQueue[galleryData.gallery.id].working = false
    //         // GalleryLayout(galleryData.gallery)
    //     })
    // }

    // function AddGalleryItem(galleryData) {
    //     if (galleryData.done === true) { return }

    //     var indexToAdd = galleryData.columns.map(function (c) { return c.items.length }).reduce(function (previous, current) { return previous + current }, 0)

    //     var retry = function () {
    //         requestAnimationFrame(function () {
    //             var nextIndex = galleryData.columns.map(function (c) { return c.items.length }).reduce(function (previous, current) { return previous + current }, 0)

    //             if (!galleryData.items[nextIndex]) {
    //                 if (galleryData.done) {
    //                     return
    //                 }

    //                 return RenderGallery(galleryData)
    //             }

    //             AddGalleryItem(galleryData)
    //         })
    //     }

    //     if (!galleryData.items[indexToAdd].height) { return retry() }

    //     var item = galleryData.items[indexToAdd]
    //     var smallestColumnHeight = galleryData.columns[0].height
    //     var smallestIndex = 0
    //     var columnIndex = 0

    //     while (columnIndex < galleryData.columns.length) {
    //         var height = galleryData.columns[columnIndex].height

    //         if (height === 0) {
    //             smallestIndex = columnIndex
    //             break
    //         }

    //         if (height < smallestColumnHeight) {
    //             smallestColumnHeight = height
    //             smallestIndex = columnIndex
    //         }

    //         columnIndex = columnIndex + 1
    //     }

    //     galleryData.columns[smallestIndex].height = galleryData.columns[smallestIndex].height + item.height
    //     galleryData.columns[smallestIndex].items.push(item)

    //     return retry()
    // }

    // function LoadGalleryItem(item, galleryData) {
    //     if (galleryQueue[galleryData.gallery.id].images[item.id]) {
    //         console.log('already loaded', item.index)
    //         return AddGalleryItem(galleryData)
    //     }

    //     console.log('loading', item.index)

    //     var thumb = new Image()
    //     var itemElement = document.createElement('div')
    //     var itemImage = document.createElement('div')
    //     itemElement.className = 'gallery-item'
    //     itemImage.className = 'gallery-image'
    //     itemImage.appendChild(thumb)
    //     itemElement.appendChild(itemImage)
    //     item.itemElement = itemElement

    //     galleryQueue[galleryData.gallery.id].images[item.id] = itemElement

    //     thumb.addEventListener('load', function () {
    //         item.aspect = thumb.width / thumb.height
    //         item.width = 300
    //         item.height = (thumb.width / 300) * thumb.height

    //         requestAnimationFrame(function () {
    //             return AddGalleryItem(galleryData)
    //         })
    //     })

    //     thumb.addEventListener('error', function () {
    //         console.log('error', thumb)
    //     })

    //     thumb.src = item.thumbnail
    // }

    // function GalleryLayout(gallery) {
    //     console.log('GalleryLayout')
    //     galleryQueue[gallery.id] = galleryQueue[gallery.id] || { images: {}, working: false, queue: false }

    //     if (galleryQueue[gallery.id].working) {
    //         galleryQueue[gallery.id].queue = true
    //         console.log('queued')
    //         return
    //     }

    //     var viewType = $(gallery).closest('.view-type.text-accent-base').attr('view') || '5'
    //     var minWidth = { '5': 200, '7': 80 }[viewType]
    //     var galleryData = {
    //         done: false,
    //         gallery: gallery,
    //         columnCount: viewType === '1' ? 1 : Math.max(Math.floor(gallery.offsetWidth / minWidth), 1),
    //         columns: [],
    //         items: conduco.galleries[gallery.id]
    //     }

    //     galleryQueue[gallery.id].working = true

    //     var itemContainer = gallery.querySelectorAll('.gallery-items')[0]
    //     var columns = itemContainer.querySelectorAll('.gallery-column')
    //     var colWidth = columns[0] ? columns[0].offsetWidth : 0
    //     console.log(colWidth)

    //     if (columns.length === galleryData.columnCount && colWidth > minWidth && colWidth < minWidth + 100) {
    //         console.log('no change required')
    //         galleryQueue[gallery.id].working = false
    //         return
    //     }

    //     var itemContainerNext = document.createElement('div')
    //     itemContainerNext.className = 'gallery-items itemContainerNext'

    //     for (var i = 0; i < galleryData.columnCount; i++) {
    //         var col = document.createElement('div')
    //         col.className = 'gallery-column'
    //         var colInner = document.createElement('div')
    //         colInner.className = 'gallery-column-inner'
    //         col.appendChild(colInner)
    //         itemContainerNext.appendChild(col)
    //         galleryData.columns.push({
    //             items: [],
    //             height: 0
    //         })
    //     }

    //     galleryData.itemContainer = itemContainer
    //     galleryData.itemContainerNext = itemContainerNext

    //     galleryData.items.forEach(function (item, index) {
    //         item.index = index
    //         LoadGalleryItem(item, galleryData)
    //     })
    // }