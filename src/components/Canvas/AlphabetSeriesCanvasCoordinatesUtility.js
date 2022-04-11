// [Components]
import AlphabetCoordinates from "./AlphabetCoordinates";
import ScoringMethod from "./ScoringMethod";

/*
 * A utility object to compare the coordinates of letter series
 * within the drawing canvas with the actual input from a user
 * drawing with the given letter series on the canvas. 
 */
class AlphabetSeriesCanvasCoordinatesUtility
{
    constructor(series)
    {
        // Character series this utility will focus on, i.e., "Aa" or "Bb", etc.
        this.series = series;
        
        // Arbitrary pixel offset used for scoring
        this.offset = 20;

        // Copy of coords to keep track of coordinates of series.
        // Using JSON.parse/stringify allows for soft copy without reference.
        this.Coordinates = JSON.parse(JSON.stringify(AlphabetCoordinates));
    };

    // Score the given mouse coordinates by determining the 
    // position of the letter that is being drawn and then 
    // making sure that the coordinates are close enough to 
    // the pre-determined coordinates of said position.
    scoreMouseMovement(x, y, scoring_method)
    {
        // list of coords for this series
        var coords_list = this.Coordinates[this.series];

        for (var i = 0; i < coords_list.length; i++)
        {
            var coords = coords_list[i];

            if ( !coords.passed )
            {
                // make sure coordinate pairs are close enough.
                if (this.inRange(x, y, coords.x, coords.y))
                {
                    //mark as checked!
                    this.Coordinates[this.series][i].passed = true;

                    //return the proper progess bar increase
                    return 100 / this.Coordinates[this.series].length;
                }
                else
                {
                    // return 0 on STRICT scoring method because
                    // this coord MUST be checked (and be in range)
                    // in order to move onto next coord pair
                    //
                    // EASY scoring will allow for all coords to get 
                    // checked before returning 0...allowing for 
                    // more generous grading of the canvas drawing
                    if (scoring_method === ScoringMethod.STRICT)
                        return 0;
                }
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