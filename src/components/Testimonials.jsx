
const Testimonials = () => {
     const testimonialsData = [
        {
            id: 1,
            name: "Samay Raina",
            position: "Student",
            message:
                "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Samay_raina_%28cropped%29.jpg/440px-Samay_raina_%28cropped%29.jpg",
        },
         {
             id: 2,
             name: "Thugesh Keshwala",
             position: "Student",
             message:
                 "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
             image: "https://yt3.googleusercontent.com/ytc/AIdro_mb6AQ_SKGatJO4z16_YA-Uxm1M9lX2qq1-vV8GWqP9byU=s160-c-k-c0x00ffffff-no-rj",
         },
         {
             id: 3,
             name: "Shikha Jain",
             position: "Student",
             message:
                 "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
             image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
         },
         {
             id: 4,
             name: "Arpit Bala",
             position: "Student",
             message:
                 "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
             image: "https://pbs.twimg.com/media/FKGVzBmVQAA-XMo.jpg:large",
         },
         
     ];
  return (
      <div className="mt-8 mx-12 font-mono">
          <h2 className="text-3xl font-bold text-center">
              What Our Students Say
          </h2>

          <br />
          <div className="flex flex-col md:flex-row gap-4 ">
              {testimonialsData.map((testimonial) => (
                  <div
                      className="flex  flex-col items-center justify-center border-4 border-purple-300 rounded-2xl p-8 "
                      key={testimonial.id}
                  >
                      <img
                          className="rounded-full h-32 w-32"
                          src={testimonial.image}
                          alt="testimonal"
                      />
                      <h3 className="font-bold mt-2">{testimonial.name}</h3>
                      <p>{testimonial.position}</p>
                      <p className=" mt-2">{testimonial.message}</p>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Testimonials
