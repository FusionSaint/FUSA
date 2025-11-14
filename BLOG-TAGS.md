# FusionSaint Blog - Tag Taxonomy

Use these tags consistently across all blog posts. Each post should have 2-4 tags maximum.

## Content Type Tags

**meta** - Meta analysis, tier lists, what's strong/weak in competitive play
- Example: "Current weapon meta breakdown"

**patch notes** - Patch analysis and quick takes on balance changes
- Example: "Patch 4.2 weapon changes explained"

**guide update** - Announcements about new or updated guides on the main site
- Example: "New REDSEC loot guide now live"

**site updates** - Technical improvements, new features, or site announcements
- Example: "We added tag filtering to the blog"

## Game Systems Tags

**weapons** - Weapon reviews, comparisons, attachments, builds
- Example: "M5A3 vs AK-24 comparison"

**loadouts** - Complete loadout recommendations and optimization
- Example: "Best assault loadout for competitive"

**tactics** - Strategy guides, positioning, team play, tactical thinking
- Example: "How to hold B flag on Renewal"

**settings** - In-game settings optimization for competitive advantage
- Example: "FOV and HUD settings for better awareness"

**loot** - Resource management, loot priority, economy systems
- Example: "REDSEC loot route optimization"

## Game Mode Tags

**redsec** - REDSEC Battle Royale specific content
- Use this for any BR-specific tactics, loot, or strategy
- REDSEC plays fundamentally different from conquest

**conquest** - Standard Battlefield 6 multiplayer modes
- Use for conquest, breakthrough, rush content
- Distinct from REDSEC battle royale

## Technical Tags

**optimization** - PC performance, FPS improvements, hardware recommendations
- Example: "Graphics settings for 144+ FPS"
- Different from "settings" which is gameplay-focused

## Philosophy/Community Tags

**competitive mindset** - Strategic thinking frameworks, improvement philosophy
- Example: "How to analyze your own gameplay"
- Posts about *how to think*, not just what to do

**stream recap** - Highlights and lessons from Twitch streams
- Example: "Friday stream: REDSEC squad tactics"

## Tag Combination Examples

### REDSEC tactics post:
```yaml
tags: ["redsec", "tactics", "loot"]
```

### Weapon meta analysis:
```yaml
tags: ["meta", "weapons"]
```

### Site announcement:
```yaml
tags: ["site updates"]
```

### Stream recap with gameplay lessons:
```yaml
tags: ["stream recap", "tactics"]
```

### PC optimization guide:
```yaml
tags: ["optimization", "settings"]
```

### Patch affecting REDSEC:
```yaml
tags: ["patch notes", "redsec", "meta"]
```

### Philosophy post about improvement:
```yaml
tags: ["competitive mindset", "tactics"]
```

## Best Practices

✅ **Use 2-4 tags per post** - More than 4 dilutes the categorization
✅ **Match exact casing** - "redsec" not "REDSEC" or "RedSec"
✅ **Match exact spacing** - "patch notes" not "patchnotes"
✅ **Pick the most relevant tags** - Don't force tags that barely apply
✅ **Check BLOG_TAGS in config.ts** - Use only defined tags

❌ **Don't create new tags ad-hoc** - Stick to the 14 defined tags
❌ **Don't use similar tags together** - Don't use both "weapons" and "loadouts" unless the post truly covers both equally
❌ **Don't over-tag** - If a post is primarily about tactics with a weapon mentioned, just use "tactics"