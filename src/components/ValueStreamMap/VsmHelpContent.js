import React from 'react'
import Typography from '@material-ui/core/Typography'

const VsmHelpContent = () => (
  <>
    <Typography variant="body1" gutterBottom>
      Value stream mapping is the first step in improving a process flow. The
      purpose of Value Stream Mapping is to understand all of the steps needed
      to deliver value. Using the informaton in the VSM, we can identify
      constraints prioritize improvements to the value stream. In manufacturing,
      this is done by observing every step in a process and capturing the actual
      time taken for each step. For software delivery we need to modify the
      approach.
    </Typography>
    <Typography variant="h5">Prerequisites</Typography>
    <Typography variant="body1" gutterBottom>
      <ol>
        <li>
          Everyone who has a touchpoint in the value stream should be present
          for the exercise. This includes, but is not limited to developers,
          managers, product owners, and representatives from external teams that
          have required steps between conception and production.
        </li>

        <li>
          Understand terms associated with value stream mapping.
          <ul>
            <li>
              Wait time/non-value time: Time between processes where activity is
              not occurring.
            </li>
            <li>
              Process time/value add time: Time spent executing a step in the
              value stream.
            </li>
            <li>
              Percent Complete/Accurate: Percentage of work that is rejected by
              the next step in the process. i.e. If code fails code review 20%
              of the time, the %C/A is 80%.
            </li>
          </ul>
        </li>
      </ol>
    </Typography>
    <Typography variant="h5">Recommended Practices</Typography>
    <Typography variant="h6">Work Backwards</Typography>
    <Typography variant="body1" gutterBottom>
      We&apos;ve found it&apos;s more effective to map the flow by describing
      the point of value delivery first and then working backwards through the
      flow. This not only focuses on the value first but also helps extract the
      knowledge from the participants since it helps remove unconscious
      assumptions .
    </Typography>
    <Typography variant="body1" gutterBottom>
      For each step:
      <ul>
        <li>What is the average process time for this step?</li>
        <li>Who is involved in this step?</li>
        <li>
          What percentage of work is rejected by the next step in the process?
        </li>
      </ul>
      Your team will need to identify these things for each step in the process.
      Don&apos;t forget to identify where your intake process is originated,
      whether that be stakeholder conversations, service desk, etc.
    </Typography>
    <Typography variant="h6">Living Document</Typography>
    <Typography variant="body1" gutterBottom>
      A VSM is only useful if it is kept current. As improvement work continues,
      review the impact to the flow and track the improvement to the overall
      value stream. Remember to avoid sub-optimization where improving one
      aspect degrades another. An example would be spending less time refining
      work so we can begin coding sooner only to discover that additional rework
      is required to address the lack of clarity in the requirements.
    </Typography>
    <Typography variant="h6">External Dependencies / Handoffs</Typography>
    <Typography variant="body1" gutterBottom>
      If a step requires waiting on an external dependency, it&apos;s often
      useful to link in a value stream map for that as well. We are only as
      efficient as our least efficient step.
    </Typography>
    <Typography variant="h5">References</Typography>
    <Typography variant="body1" gutterBottom>
      <ul>
        <li>
          <a href="https://creately.com/blog/diagrams/value-stream-mapping-guide/">
            Value Stream Mapping Guide
          </a>
        </li>
        <li>
          <a href="https://www.lean.org/Bookstore/ProductDetails.cfm?SelectedProductId=9">
            Learning to See
          </a>
        </li>
      </ul>
    </Typography>
  </>
)

export default VsmHelpContent
