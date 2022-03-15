// A utility class to compare the coordinates of letter series
// within the drawing canvas with the actual input from 
// a user drawing said letter series on the canvas.
class AlphabetSeriesCanvasCoordinatesUtility
{
    constructor(series)
    {
        // character series this utility will focus on
        this.series = series;
        
        // arbitrary offset used for scoring
        this.offset = 20;

        /***************************************************
         * These fields below keep track of the required coords
         * to draw the letter series correctly. In stages, 
         * and in order, utility will change 'passed' field
         * to 'true' to signify that user has drawn over 
         * that coord correctly.
         ***************************************************/

        this.Coordinates = {
            
            Aa: [
                // A
                {x: 39, y: 23,   passed: false},
                {x: 21, y: 89,   passed: false},
                {x: 14, y: 125,  passed: false},
                {x: 39, y: 23,   passed: false},
                {x: 62, y: 89,   passed: false},
                {x: 68, y: 125,  passed: false},
                {x: 21, y: 89,   passed: false},
                {x: 62, y: 89,   passed: false},

                // a
                {x: 123, y: 62,  passed: false},
                {x: 102, y: 69,  passed: false},
                {x: 92, y: 87,   passed: false},
                {x: 90, y: 109,  passed: false},
                {x: 100, y: 124, passed: false},
                {x: 116, y: 121, passed: false},
                {x: 124, y: 106, passed: false},
                {x: 123, y: 85,  passed: false},
                {x: 123, y: 62,  passed: false},
                {x: 124, y: 106, passed: false},
                {x: 123, y: 85,  passed: false},
                {x: 132, y: 124, passed: false},
            ],

            Bb: [ ],

            Cc: [ ]
        };

        // Object to keep track of proper progress increases
        // based on the number of coords in each character series.
        // TODO: Could this be stored in the coords object above?
        this.ProgressIncreases = {
            Aa: 100 / this.Coordinates.Aa.length
        };
    }

    // Score the given mouse coordinates by determining the 
    // position of the letter that is being drawn and then 
    // making sure that the coordinates are close enough to 
    // the pre-determined coordinates of said position.
    scoreMouseMovement(x, y)
    {
        var coords_tmp = this.Coordinates[this.series];

        for (var i = 0; i < coords_tmp.length; i++)
        {
            var coords = coords_tmp[i];

            if ( !coords.passed )
            {
                // make sure coordinate pairs are close enough.
                // NOTE: based on offset in constructor.
                if (this.inRange(x, y, coords.x, coords.y))
                {
                    //mark as checked!
                    this.Coordinates[this.series][i].passed = true;

                    //return the proper progess increase
                    return this.ProgressIncreases[this.series];
                }
                else
                    return 0;
            }
        }
        return 0;
    };

    // Clears all boolean 'passed' attributes for 
    // the current series that is being targeted by
    // this utility. This should happen upon
    // retrial or when user has failed the scoring.
    clearPassed = () =>
    {
        for (var i = 0; i < this.Coordinates[this.series].length; i++)
        {
            this.Coordinates[this.series][i].passed = false;
        }
    }

    // Helper function to determine if a pair of 
    // coordinates are close enough based on a 
    // pre-set offset in the constructor.
    inRange = (mouseX, mouseY, coordsX, coordsY) =>
    {
        var xMin = coordsX-this.offset;
        var xMax = coordsX+this.offset;
        var yMin = coordsY-this.offset;
        var yMax = coordsY+this.offset;

        var xInRange = ((mouseX-xMin)*(mouseX-xMax) <= 0);
        var yInRange = ((mouseY-yMin)*(mouseY-yMax) <= 0);

        return xInRange && yInRange;
    };
};

export default AlphabetSeriesCanvasCoordinatesUtility;