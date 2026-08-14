# Tree

An explorable tree at every scale.

The project begins with an English / pedunculate oak (*Quercus robur*). The central design constraint is **detail**: this is not intended to be a decorative generic 3D tree. The visible tree should form a connected hierarchy from trunk to limbs, branches, twigs, buds and leaves, with progressively deeper biological detail as the viewer moves closer.

## Current prototype

- Browser-based Three.js scene suitable for GitHub Pages
- Mouse/touch orbit and deep zoom
- Procedurally generated asymmetric oak structure
- Connected trunk → branch → twig hierarchy
- Individually modelled lobed leaves and terminal buds
- Root flare / structural surface roots
- Tap/click inspection of trunk, roots, branches, twigs, buds and leaves
- Mobile-friendly full-screen interface

## Detail roadmap

1. **Macroscopic structure** — improve oak architecture, branch taper, branch collars, bark variation, deadwood, scars, epicormic shoots and realistic crown asymmetry.
2. **Twig scale** — nodes, internodes, clustered terminal buds, lateral buds, bud scales, leaf scars and lenticels.
3. **Leaf scale** — accurate *Q. robur* leaf geometry, petiole, midrib, secondary/tertiary venation, upper/lower surface differences, damage and variation.
4. **Bark scale** — age-dependent fissures and plates rather than a flat material.
5. **Trunk anatomy** — peel/cutaway mode: outer bark, phloem, vascular cambium, sapwood/xylem, heartwood, pith, rays and annual rings.
6. **Root system** — structural roots → lateral roots → fine roots → root hairs, with an adjustable ground cutaway.
7. **Microscopic transition** — epidermis → stomata/guard cells → mesophyll → vascular bundles → cells → chloroplasts.
8. **Biological processes** — trace water through xylem and assimilates through phloem; inspect growth and annual-ring formation.
9. **Time** — seasonal state and eventually growth through years.
10. **Species** — add European yew (*Taxus baccata*) as the second species while retaining species-specific architecture and anatomy.

## Performance principle

Extreme detail must not mean rendering everything simultaneously. The long-term implementation will use progressive levels of detail and instancing so the geometry nearest the viewer can become much richer while distant structures remain cheap to render.

Created by [pelld](https://github.com/pelld).