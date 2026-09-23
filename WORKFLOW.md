1\. Walk through the final `calculateTicketPrice` and name which contributor's change is responsible for each part.



```js

function calculateTicketPrice(quantity, basePrice, isPremium) {

&#x20; let total = quantity \* basePrice;

&#x20; if (quantity >= 5) {

&#x20;   total = total \* 0.9; // Clone A (Task 1): 10% group discount for 5+ tickets

&#x20; }

&#x20; if (isPremium) {

&#x20;   total = total \* 1.5; // Clone C (Task 4): 50% VIP surcharge for premium seating

&#x20; }

&#x20; total = total - 10; // Clone A (Task 6): flat $10 discount off any order

&#x20; return Math.round(total); // Clone B (Task 2): rounding instead of truncating

}

```



\- The base calculation (`quantity \* basePrice`) is the original starter code.

\- The 10% group discount for 5+ tickets came from Clone A in Task 1.

\- Rounding instead of truncating (`Math.round` instead of `Math.floor`) came from Clone B in Task 2.

\- The 50% VIP surcharge for premium seating, including the new `isPremium` parameter, came from Clone C in Task 4.

\- The flat $10 discount off any order came from Clone A again in Task 6.



2\. Compare Task 3's two-way conflict to Task 5's three-way conflict — what got harder with a third line of work?



In Task 3, the conflict was a clean either/or split between two independent changes to the same function — Clone B's rounding versus Clone A's group discount. Resolving it just meant combining both operations in a sensible order (apply the discount, then round). There was no structural mismatch between the two sides.



In Task 5, the conflict was harder because one side of the conflict (the incoming remote history) already represented two merged changes, while my side (Clone C) introduced a structurally different change — a new function parameter, `isPremium`. This wasn't just "keep both lines of logic," it required updating the function signature itself and making sure the new parameter was threaded through correctly so it didn't silently disappear. A three-way conflict isn't simply "twice as much conflict" as a two-way one — it can require reasoning about how the changes interact structurally, not just which lines to keep.



3\. Task 6's flat $10 discount changed the expected result of tests unrelated to your change (the group-discount and VIP tests). Why, and what does that tell you about "isolated" changes in shared code?



The group-discount and VIP tests weren't actually testing isolated features — they were testing the shared `calculateTicketPrice` function as a whole. Adding a flat $10 discount that applies to "any order" meant every call to that function now included an extra step, regardless of whether the call involved 5+ tickets or premium seating. Because the tests check the function's final output, not just the presence of a specific feature, any change to shared logic can shift results for scenarios that look unrelated on the surface.



This is a good reminder that in shared code, there's no such thing as a fully isolated change. Every modification to a function used by multiple features is really a modification to every one of those features' behavior. Tests need to be re-verified against the new combined behavior after any shared-code change, not just the specific feature the change was meant to address.



4\. If this were a real team of three, what one process change would have prevented all three rejected pushes?



The single change I'd make is to stop having all three contributors work directly on the same shared branch (`feature/group-pricing`) at the same time. Instead, each contributor would work on their own short-lived sub-branch (e.g. `feature/group-pricing-discount`, `feature/group-pricing-rounding`, `feature/group-pricing-vip`), and merge into the shared branch one at a time through a pull request. This wouldn't eliminate conflicts — the underlying changes still touch the same function — but it would mean conflicts get caught and resolved deliberately during a reviewed merge, rather than discovered accidentally as a rejected push after work has already been committed locally. It also creates a natural checkpoint where a contributor can see that someone else's work has already landed before they even start, rather than finding out only when their push is rejected.

