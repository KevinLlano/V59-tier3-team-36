## Summary
<!-- Example: "Adds role-based question filtering and updates the UI to show active filters." -->
<write 1–3 sentences>

## Context / Why
<!-- Example: "this supports User Story 2.1." -->
- Ticket / User story:
- Related PRs / issues:

## What changed (bullets)
<!-- Example:
- Backend: validation tightened for session creation
- Frontend: filter UI + empty state copy updated
- Shared: renamed field `roleType` -> `role_category`
-->
- 
- 
- 

## Before / After — Backend (behavior)
<!-- Keep it behavioral, not implementation. Use as many bullets as needed. -->
**Before:**  
<!-- Example:
- Certain inputs were accepted but later failed deeper in the flow
- Error responses were inconsistent across cases
-->
- 

**After:**  
<!-- Example:
- Invalid inputs fail fast with consistent errors
- Responses include a stable message + code for the UI to display
-->
- 

## Before / After — Frontend (behavior/UI)
<!-- Describe user-visible behavior. No need to list every pixel. -->
**Before:**  
<!-- Example:
- User could select filters but it wasn’t obvious which were active
- Empty state didn’t explain what to do next
-->
- 

**After:**  
<!-- Example:
- Active filters are shown as chips with a clear button
- Empty state tells the user how to broaden results
-->
- 

## Evidence of change (choose what applies)
<!-- Examples:
- Screenshots (before/after): added below
- Video (Loom): <link>
- API proof: curl/response snippet or Postman screenshot
- Logs/metrics screenshot (if relevant)
-->
- Evidence:

## How to test - how will a code reviewer test this?
<!-- Example:
1. Checkout branch and run backend + frontend
2. Go to "Questions" and select Role = Web Developer
3. Confirm list updates and empty state appears when no results
-->
1.
2.
3.

## Tests run - what tests did you run?
<!-- Example: "npm test (backend), npm run lint, manual smoke test on /map and /list" -->
-

## Unit test screenshots
<!-- Example: "npm test (backend), npm run lint, manual smoke test on /map and /list" -->
-


## Risks / notes - notify others of potential risks/conflicts you forsee
<!-- Example:
- Risk: medium (touches validation + UI filtering)
- Mitigation: backward compatible responses; added tests; easy rollback by reverting PR
-->
-

## Checklist
- [ ] Summary and Change Overview are complete
- [ ] Each backend change documented (type + before/after)
- [ ] Each frontend change documented (before/after)
- [ ] Unit Tests updated and passing
- [ ] Evidence added or marked N/A
