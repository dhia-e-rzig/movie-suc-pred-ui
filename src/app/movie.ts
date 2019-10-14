export class Movie {
    constructor(
        public name?: string,
        public wins?: number,
        public reviews?: number,
        public photos?: number,
        public genres?: string[],
        public director?: string[],
        public actors?: string[],
        public country?: string[],
        public language?: string[],
        public content_rating?: string
      ) {  }
        

}
