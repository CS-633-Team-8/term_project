import React from "react"
import SectionMessage from "@atlaskit/section-message"

const AddFAQMessage = () => {
  return (
    <SectionMessage title="How to structure the question">
      <p>
        Harold will answer a faq enquiry with the phrase "I know " followed by
        the question he matched. Therefore it must be structured to match this
        congugation. A good example is a user asking "How does AI work" Harold
        SHOULD answer "I know how AI works" followed by the answer, to achieve
        this the answer should be phrased "how AI works". For more info on how
        Harold matched the FAQs ask him!
      </p>
    </SectionMessage>
  )
}

export default AddFAQMessage
