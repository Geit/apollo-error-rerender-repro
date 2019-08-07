# apollo-react-timing-repro

## Reproduction steps
 - Install packages
 - `yarn test`

## Expected outcome
Error is persisted, and both tests pass

## Actual outcome
A subsequent rerender causes the error prop to be removed - with one test consistently failing, and the other intermittently failing.