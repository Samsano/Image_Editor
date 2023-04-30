namespace SpriteKind {
    export const Temporary = SpriteKind.create()
}
let tempNum = 0
let TempImg = image.create(16, 16)
enum DegréesToRotate {
    clockwise = 1,
    counterclockwise = 2,
    dubbleClockwise = 3
}
enum Size {
    Whith = 1,
    Hight = 2
}
function PixelValue(X: number, Y: number, Image2: Image) {
    return (Image2.getPixel(X + 1, Y) + Image2.getPixel(X - 1, Y) + (Image2.getPixel(X, Y + 1) + Image2.getPixel(X, Y - 1)) + (Image2.getPixel(X + 1, Y + 1) + Image2.getPixel(X + 1, Y - 1) + (Image2.getPixel(X - 1, Y + 1) + Image2.getPixel(X - 1, Y - 1)))) / 8
}
/**
 * Image Editor
 */
//% weight=49 color=#f1992b icon=""
namespace Image_Editor {
    /**
     * Draw an Image to another Image
     * Your first Image
     * Your second image
     */
    //% block="draw $myImage onto $myImage2"
    //% myImage.shadow=screen_image_picker
    //% myImage2.shadow=screen_image_picker
    export function Print(myImage: Image, myImage2: Image): Image {
        let TempImg = myImage2.clone()
        for (let X = 0; X <= TempImg.width; X++) {
            for (let Y = 0; Y <= TempImg.height; Y++) {
                if (myImage.getPixel(X, Y) != 0) {
                    myImage2.setPixel(X, Y, myImage.getPixel(X, Y))
                }
            }
        }
        return myImage2
    }
}
namespace Image_Editor {
    /**
     * TODO: describe your function here, makes perline noise from en image
     * @param Image2 describe parameter here, the image to Create prerline noise
     * @param BlendingLevel describe parameter here, the Blending Level
     */
    //% block="noise image onto $Image2 Thicness $BlendingLevel"
    //% Image2.shadow=screen_image_picker
    //% BlendingLevel.number
    export function CreatePerline_image(Image2: Image, BlendingLevel: number) {
        for (let X = 0; X <= Image2.width; X++) {
            for (let Y = 0; Y <= Image2.height; Y++) {
                if (X == 0 || Y == 0 || X == Image2.width - 1 || Y == Image2.height - 1) {
                    Image2.setPixel(X, Y, randint(12, 16))
                } else {
                    Image2.setPixel(X, Y, randint(3, 15))
                }
            }
        }
        for (let Times = 0; Times <= 1; Times++) {
            for (let X2 = 0; X2 <= Image2.width; X2++) {
                Image2.setPixel(X2, Times * (Image2.height - 1), PixelValue(X2, Times * (Image2.height - 1), Image2) + 1)
            }
            for (let Y2 = 0; Y2 <= Image2.height; Y2++) {
                Image2.setPixel(Times * (Image2.width - 1), Y2, PixelValue(Times * (Image2.width - 1), Y2, Image2) + 1)
            }
        }
        for (let Times = 0; Times < BlendingLevel; Times++) {
            for (let X2 = 0; X2 <= Image2.width - 3; X2++) {
                for (let Y2 = 0; Y2 <= Image2.height - 3; Y2++) {
                    Image2.setPixel(X2 + 1, Y2 + 1, PixelValue(X2 + 1, Y2 + 1, Image2))
                }
            }
        }

        return Image2
    }
}
namespace Image_Editor {
    /**
     * TODO: describe your function here, rotate any square image
     * @param myImage describe parameter here, the image you want to rotate
    * @param Rotate describe parameter here, rotate it clockwise or counterclockwise
     */
    //% block="Rotate $myImage 90° $Rotate"
    //% myImage.shadow=screen_image_picker
    //% Rotate.enum

    export function Rotate(myImage: Image, Rotate: DegréesToRotate): Image {
        let TempImg = image.create(myImage.width, myImage.height)
        if (Rotate == 1) {
            for (let X1 = 0; X1 <= TempImg.width; X1++) {
                for (let Y1 = 0; Y1 <= TempImg.height; Y1++) {
                    TempImg.setPixel(X1, Y1, myImage.getPixel(myImage.height - Y1, X1))
                }
            }
        } else if (Rotate == 2) {
            for (let X2 = 0; X2 <= TempImg.width; X2++) {
                for (let Y2 = 0; Y2 <= TempImg.height; Y2++) {
                    TempImg.setPixel(X2, Y2, myImage.getPixel(Y2, myImage.width - X2))
                }
            }
        }
        return TempImg
    }
}
namespace Image_Editor {
    /**
     * Find the width or the height of en image
     * The image you want to find the width or the height
     * Choose if you want to know the width or the height
     */
    //% block="$size of $MyImage "
    //% MyImage.shadow=screen_image_picker
    //% size.Size
    // come back to this one 
    export function FindSizeOf(size: Size, MyImage: Image): number {
        if (size == 1) {
            return MyImage.width
        } else {
            return MyImage.height
        }
    }
}
namespace Image_Editor {
    /**
     * Makes a grid with your image
     * The image you want to make a grid of
     * The amont of times to place your image on the X axes
     * The amont of times to place your image on the Y axes
     */
    //% block="Grid of $imagE size x $Xtimes y $Ytimes"
    //% imagE.shadow=screen_image_picker
    //% Xtimes.Number
    //% Ytimes.Number
    export function MakeGrid(imagE: Image, Xtimes: number, Ytimes: number): Image {
        let TempImg = image.create(imagE.width * Xtimes, imagE.height * Ytimes)
        for (let X = 0; X <= imagE.width * Xtimes; X++) {
            for (let Y = 0; Y <= imagE.height * Ytimes; Y++) {
                TempImg.setPixel(X, Y, imagE.getPixel(X % imagE.width, Y % imagE.height))
            }
        }
        return TempImg
    }
}