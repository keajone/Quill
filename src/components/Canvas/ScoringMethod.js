/**
 * Scoring Method enum for utility to use 
 * when determining how to score coordinate pairs.
 * 
 * This class is intended to be added upon if 
 * future scoring methods can be implemented in the 
 * future, i.e., Using a Service, Super-Easy, Super-Strict, etc.
 */
class ScoringMethod
{
    // Different instances of scoring methods
    static EASY = new ScoringMethod("easy");
    static STRICT = new ScoringMethod("strict");

    // Constructor to setup this 'enum'
    constructor(method)
    {
        this.method = method;
    }
};

export default ScoringMethod;