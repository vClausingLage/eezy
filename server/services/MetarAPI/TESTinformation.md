localhost:4000/api/metardecoder/YLHI 071830Z 25021G34KT AUTO 1 3/4SM 35011KT 9999 -RA DRSN SCT018 BKN030 BKN048 12/M05 Q1011 NOSIG RMK RWY16 08004KT 310V110 BECMG BKN007 TEMPO 0600 BKN210

**PRECIPITATION**

- global string
  - /\s(-?|\+?|)[a-z]{2} ?(?:(-?|\+?|)[a-z]{2})? ?(?:(-?|\+?|)[a-z]{2})?\s/gi
  - -> matches AUTO
  - -> has whitespace at start & end!
- string elements

  - ^(-?|\+?|)(?:[a-z]{4}|[a-z]{2})$
  - -> possibliy add **6**

  * Die wichtigste Form des Niederschlags wird zuerst aufgeführt. Beispiel: GRRA ist mehr Hagel als Regen, RAGR ist mehr Regen als Hagel.
  * Die Intensität und ob es schauerartig ist SH wird nur in Verbindung mit Niederschlag verwendet. Zum Beispiel, wenn es Schauer mit starkem Regen gibt: +SHRA
  * Wenn keine Intensität angegeben ist, handelt es sich um mäßigen Niederschlag.
  * MI, BC und PR werden nur bei Nebel verwendet: Bodennebel, Nebelbänke und teilweise Abdeckung des Flugplatzes.
  * Hypothermic FZ wird nur in Verbindung mit Regen RA, Sprühregen DZ und Nebel FG verwendet. Das bedeutet, dass es sofort gefriert, wenn es mit einer festen Oberfläche in Berührung kommt.
  * Fegend DR und fegend BL werden nur in Verbindung mit Schnee SN, Sand SA und verbreiteter Staub DU verwendet.

YLHI 071830Z AUTO 35011KT 9999 -RA DRSN SCT018 BKN030 BKN048 23/20 Q1011
EHGG 071825Z AUTO 25005KT 9999 NCD M01/M02 Q0997 TEMPO 4000 SHGSSNRA SCT025CB

**recent**

LTBJ 071820Z VRB04KT 9999 -TSRA FEW015CB SCT030 BKN100 11/11 Q1013 RESHRA BECMG TL1900 NSW RMK RWY16 08004KT 310V110

**RMK**

SPZO 071830Z VRB04KT 9999 SCT050 SCT100 21/04 Q1027 NOSIG RMK BIRD HAZARD RWY 10/28

**BECMG**

LZIB 071830Z 17009KT 9999 FEW013 BKN014 05/02 Q1001 BECMG BKN007

**NCD CAVOK CLR**

LBGO 071830Z AUTO VRB02KT **9999 NCD** 08/03 Q1006 NOSIG
KQEW 071830Z AUTO 25003KT **9999 CLR** 12/M05 A3011 RMK A02 TSNO
BKPR 071830Z 25013KT **CAVOK** 09/03 Q1008 NOSIG

-> NCD & CLR with visibility , CAVOK != visibility

## further read

- http://www.dixwx.com/wxdecoding.htm#rem
- -> PDF file
