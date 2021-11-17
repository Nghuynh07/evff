class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //below is one way to query. b/c find() method returns a query object so we can query right in there by chaining .where.equals etc... more information on the mongoDB query section. The find() method and long with other query methods are actually a prototype of the query class.
    // const query = Product.find()
    //   .where('category')
    //   .equals('Vegetables')
    //   .where('packaging')
    //   .equals('lb')
    //   .where('price')
    //   .lte(2.5);
    // console.log(req.query);
    //BUILD QUERY a better way
    //Here we are making a hard copy of the req.query object using destructuring then excludes all the fields using array; these fields if presented in the query it will get removed from the query object b/c these are features that we want to chain on the query. Element in the excludedFields array are not part of the model; therefore, if these present, we want to ignore/delete it and only query everything else basically whatever that is in the model that we're trying to query.
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    //using regular expression to replace all of these abbreviation to have $ sign in front of it so that we can query. Then the call back function is to replace all that matches in the Regex, Then JSON.parse() basically to return the string back to object
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // {difficulty :'easy', duration: {$gte: 5}}

    //not querying right away b/c we want to chain other queries before executing it; since find() returns a query object, we setting it as a query variable then later await all queries that we are chaining at the same time. If we await the products right after the first query, then it would stop at the first query and not chaining the rest. Ideally we want to chain all the queries object that we set to query.
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Product.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    //sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }
  limit() {
    //fields limiting showing only what user wanted to show otherwise remove __v
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  pagination() {
    //pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
