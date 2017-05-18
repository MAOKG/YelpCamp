var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
var data = [
    {
        name: "Clound's Rest",
        image: 'https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    }, 
    {
        name: 'Cool Winter Camp',
        image: 'https://farm9.staticflickr.com/8158/7626398594_8aa306ac65.jpg',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        name: 'Baby Camp',
        image: 'https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    }
];
    
function seedDB() {
    // Remove all campgrounds
   Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Campgrounds removed!!');
        }
        // Add a few campgrounds
        data.forEach(function(seed) {
          Campground.create(seed, function(err, newCampground) {
             if (err) {
                 console.log(err);
             } else {
                 console.log('Added a campground!');
                 // Create a comment
                 Comment.create(
                    {
                        text: 'This place is great, but I wish there was internet',
                        author: 'Homer'
                    }, function(err, comment) {
                         if (err) {
                             console.log(err);
                         } else {
                             newCampground.comments.push(comment);
                             newCampground.save();
                             console.log('Created new comment');
                         }
                 });
             }
            }); 
        });
    }); 

}
module.exports = seedDB;