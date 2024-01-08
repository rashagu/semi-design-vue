import {shallowMount, mount} from "@vue/test-utils";
import { expect, test } from 'vitest';
import {default as IconAccessibility, SvgComponent as SvgComponent0 }  from "./icons/IconAccessibility";
import {default as IconAnchor, SvgComponent as SvgComponent1 }  from "./icons/IconAnchor";
import {default as IconAutocomplete, SvgComponent as SvgComponent2 }  from "./icons/IconAutocomplete";
import {default as IconAvatar, SvgComponent as SvgComponent3 }  from "./icons/IconAvatar";
import {default as IconBackTop, SvgComponent as SvgComponent4 }  from "./icons/IconBackTop";
import {default as IconBadgeStar, SvgComponent as SvgComponent5 }  from "./icons/IconBadgeStar";
import {default as IconBadge, SvgComponent as SvgComponent6 }  from "./icons/IconBadge";
import {default as IconBanner, SvgComponent as SvgComponent7 }  from "./icons/IconBanner";
import {default as IconBreadcrumb, SvgComponent as SvgComponent8 }  from "./icons/IconBreadcrumb";
import {default as IconButton, SvgComponent as SvgComponent9 }  from "./icons/IconButton";
import {default as IconCalendar, SvgComponent as SvgComponent10 }  from "./icons/IconCalendar";
import {default as IconCard, SvgComponent as SvgComponent11 }  from "./icons/IconCard";
import {default as IconCarousel, SvgComponent as SvgComponent12 }  from "./icons/IconCarousel";
import {default as IconCascader, SvgComponent as SvgComponent13 }  from "./icons/IconCascader";
import {default as IconChangelog, SvgComponent as SvgComponent14 }  from "./icons/IconChangelog";
import {default as IconCheckbox, SvgComponent as SvgComponent15 }  from "./icons/IconCheckbox";
import {default as IconCollapse, SvgComponent as SvgComponent16 }  from "./icons/IconCollapse";
import {default as IconCollapsible, SvgComponent as SvgComponent17 }  from "./icons/IconCollapsible";
import {default as IconColorPlatteNew, SvgComponent as SvgComponent18 }  from "./icons/IconColorPlatteNew";
import {default as IconColorPlatte, SvgComponent as SvgComponent19 }  from "./icons/IconColorPlatte";
import {default as IconConfig, SvgComponent as SvgComponent20 }  from "./icons/IconConfig";
import {default as IconDarkMode, SvgComponent as SvgComponent21 }  from "./icons/IconDarkMode";
import {default as IconDatePicker, SvgComponent as SvgComponent22 }  from "./icons/IconDatePicker";
import {default as IconDescriptions, SvgComponent as SvgComponent23 }  from "./icons/IconDescriptions";
import {default as IconDivider, SvgComponent as SvgComponent24 }  from "./icons/IconDivider";
import {default as IconDropdown, SvgComponent as SvgComponent25 }  from "./icons/IconDropdown";
import {default as IconEmpty, SvgComponent as SvgComponent26 }  from "./icons/IconEmpty";
import {default as IconFaq, SvgComponent as SvgComponent27 }  from "./icons/IconFaq";
import {default as IconForm, SvgComponent as SvgComponent28 }  from "./icons/IconForm";
import {default as IconGettingStarted, SvgComponent as SvgComponent29 }  from "./icons/IconGettingStarted";
import {default as IconGrid, SvgComponent as SvgComponent30 }  from "./icons/IconGrid";
import {default as IconHeart, SvgComponent as SvgComponent31 }  from "./icons/IconHeart";
import {default as IconHighlight, SvgComponent as SvgComponent32 }  from "./icons/IconHighlight";
import {default as IconImage, SvgComponent as SvgComponent33 }  from "./icons/IconImage";
import {default as IconInputNumber, SvgComponent as SvgComponent34 }  from "./icons/IconInputNumber";
import {default as IconInput, SvgComponent as SvgComponent35 }  from "./icons/IconInput";
import {default as IconIntro, SvgComponent as SvgComponent36 }  from "./icons/IconIntro";
import {default as IconLayout, SvgComponent as SvgComponent37 }  from "./icons/IconLayout";
import {default as IconList, SvgComponent as SvgComponent38 }  from "./icons/IconList";
import {default as IconLocaleProvider, SvgComponent as SvgComponent39 }  from "./icons/IconLocaleProvider";
import {default as IconModal, SvgComponent as SvgComponent40 }  from "./icons/IconModal";
import {default as IconNavigation, SvgComponent as SvgComponent41 }  from "./icons/IconNavigation";
import {default as IconNotification, SvgComponent as SvgComponent42 }  from "./icons/IconNotification";
import {default as IconOverflow, SvgComponent as SvgComponent43 }  from "./icons/IconOverflow";
import {default as IconPagination, SvgComponent as SvgComponent44 }  from "./icons/IconPagination";
import {default as IconPopconfirm, SvgComponent as SvgComponent45 }  from "./icons/IconPopconfirm";
import {default as IconPopover, SvgComponent as SvgComponent46 }  from "./icons/IconPopover";
import {default as IconProgress, SvgComponent as SvgComponent47 }  from "./icons/IconProgress";
import {default as IconRadio, SvgComponent as SvgComponent48 }  from "./icons/IconRadio";
import {default as IconRating, SvgComponent as SvgComponent49 }  from "./icons/IconRating";
import {default as IconScrollList, SvgComponent as SvgComponent50 }  from "./icons/IconScrollList";
import {default as IconSelect, SvgComponent as SvgComponent51 }  from "./icons/IconSelect";
import {default as IconSideSheet, SvgComponent as SvgComponent52 }  from "./icons/IconSideSheet";
import {default as IconSkeleton, SvgComponent as SvgComponent53 }  from "./icons/IconSkeleton";
import {default as IconSlider, SvgComponent as SvgComponent54 }  from "./icons/IconSlider";
import {default as IconSpace, SvgComponent as SvgComponent55 }  from "./icons/IconSpace";
import {default as IconSpin, SvgComponent as SvgComponent56 }  from "./icons/IconSpin";
import {default as IconSteps, SvgComponent as SvgComponent57 }  from "./icons/IconSteps";
import {default as IconSwitch, SvgComponent as SvgComponent58 }  from "./icons/IconSwitch";
import {default as IconTable, SvgComponent as SvgComponent59 }  from "./icons/IconTable";
import {default as IconTabs, SvgComponent as SvgComponent60 }  from "./icons/IconTabs";
import {default as IconTagInput, SvgComponent as SvgComponent61 }  from "./icons/IconTagInput";
import {default as IconTag, SvgComponent as SvgComponent62 }  from "./icons/IconTag";
import {default as IconTimePicker, SvgComponent as SvgComponent63 }  from "./icons/IconTimePicker";
import {default as IconTimeline, SvgComponent as SvgComponent64 }  from "./icons/IconTimeline";
import {default as IconToast, SvgComponent as SvgComponent65 }  from "./icons/IconToast";
import {default as IconToken, SvgComponent as SvgComponent66 }  from "./icons/IconToken";
import {default as IconTooltip, SvgComponent as SvgComponent67 }  from "./icons/IconTooltip";
import {default as IconTransfer, SvgComponent as SvgComponent68 }  from "./icons/IconTransfer";
import {default as IconTreeSelect, SvgComponent as SvgComponent69 }  from "./icons/IconTreeSelect";
import {default as IconTree, SvgComponent as SvgComponent70 }  from "./icons/IconTree";
import {default as IconTypography, SvgComponent as SvgComponent71 }  from "./icons/IconTypography";
import {default as IconUpload, SvgComponent as SvgComponent72 }  from "./icons/IconUpload";
import {default as IconVersionTwo, SvgComponent as SvgComponent73 }  from "./icons/IconVersionTwo";
import {default as IconWheelChair, SvgComponent as SvgComponent74 }  from "./icons/IconWheelChair";
test('render with scoped-slot', async () => {
  const wrapper0 = shallowMount(IconAccessibility, {});
  const wrapperSvgComponent0 = shallowMount(SvgComponent0, {});
  
const wrapper1 = shallowMount(IconAnchor, {});
  const wrapperSvgComponent1 = shallowMount(SvgComponent1, {});
  
const wrapper2 = shallowMount(IconAutocomplete, {});
  const wrapperSvgComponent2 = shallowMount(SvgComponent2, {});
  
const wrapper3 = shallowMount(IconAvatar, {});
  const wrapperSvgComponent3 = shallowMount(SvgComponent3, {});
  
const wrapper4 = shallowMount(IconBackTop, {});
  const wrapperSvgComponent4 = shallowMount(SvgComponent4, {});
  
const wrapper5 = shallowMount(IconBadgeStar, {});
  const wrapperSvgComponent5 = shallowMount(SvgComponent5, {});
  
const wrapper6 = shallowMount(IconBadge, {});
  const wrapperSvgComponent6 = shallowMount(SvgComponent6, {});
  
const wrapper7 = shallowMount(IconBanner, {});
  const wrapperSvgComponent7 = shallowMount(SvgComponent7, {});
  
const wrapper8 = shallowMount(IconBreadcrumb, {});
  const wrapperSvgComponent8 = shallowMount(SvgComponent8, {});
  
const wrapper9 = shallowMount(IconButton, {});
  const wrapperSvgComponent9 = shallowMount(SvgComponent9, {});
  
const wrapper10 = shallowMount(IconCalendar, {});
  const wrapperSvgComponent10 = shallowMount(SvgComponent10, {});
  
const wrapper11 = shallowMount(IconCard, {});
  const wrapperSvgComponent11 = shallowMount(SvgComponent11, {});
  
const wrapper12 = shallowMount(IconCarousel, {});
  const wrapperSvgComponent12 = shallowMount(SvgComponent12, {});
  
const wrapper13 = shallowMount(IconCascader, {});
  const wrapperSvgComponent13 = shallowMount(SvgComponent13, {});
  
const wrapper14 = shallowMount(IconChangelog, {});
  const wrapperSvgComponent14 = shallowMount(SvgComponent14, {});
  
const wrapper15 = shallowMount(IconCheckbox, {});
  const wrapperSvgComponent15 = shallowMount(SvgComponent15, {});
  
const wrapper16 = shallowMount(IconCollapse, {});
  const wrapperSvgComponent16 = shallowMount(SvgComponent16, {});
  
const wrapper17 = shallowMount(IconCollapsible, {});
  const wrapperSvgComponent17 = shallowMount(SvgComponent17, {});
  
const wrapper18 = shallowMount(IconColorPlatteNew, {});
  const wrapperSvgComponent18 = shallowMount(SvgComponent18, {});
  
const wrapper19 = shallowMount(IconColorPlatte, {});
  const wrapperSvgComponent19 = shallowMount(SvgComponent19, {});
  
const wrapper20 = shallowMount(IconConfig, {});
  const wrapperSvgComponent20 = shallowMount(SvgComponent20, {});
  
const wrapper21 = shallowMount(IconDarkMode, {});
  const wrapperSvgComponent21 = shallowMount(SvgComponent21, {});
  
const wrapper22 = shallowMount(IconDatePicker, {});
  const wrapperSvgComponent22 = shallowMount(SvgComponent22, {});
  
const wrapper23 = shallowMount(IconDescriptions, {});
  const wrapperSvgComponent23 = shallowMount(SvgComponent23, {});
  
const wrapper24 = shallowMount(IconDivider, {});
  const wrapperSvgComponent24 = shallowMount(SvgComponent24, {});
  
const wrapper25 = shallowMount(IconDropdown, {});
  const wrapperSvgComponent25 = shallowMount(SvgComponent25, {});
  
const wrapper26 = shallowMount(IconEmpty, {});
  const wrapperSvgComponent26 = shallowMount(SvgComponent26, {});
  
const wrapper27 = shallowMount(IconFaq, {});
  const wrapperSvgComponent27 = shallowMount(SvgComponent27, {});
  
const wrapper28 = shallowMount(IconForm, {});
  const wrapperSvgComponent28 = shallowMount(SvgComponent28, {});
  
const wrapper29 = shallowMount(IconGettingStarted, {});
  const wrapperSvgComponent29 = shallowMount(SvgComponent29, {});
  
const wrapper30 = shallowMount(IconGrid, {});
  const wrapperSvgComponent30 = shallowMount(SvgComponent30, {});
  
const wrapper31 = shallowMount(IconHeart, {});
  const wrapperSvgComponent31 = shallowMount(SvgComponent31, {});
  
const wrapper32 = shallowMount(IconHighlight, {});
  const wrapperSvgComponent32 = shallowMount(SvgComponent32, {});
  
const wrapper33 = shallowMount(IconImage, {});
  const wrapperSvgComponent33 = shallowMount(SvgComponent33, {});
  
const wrapper34 = shallowMount(IconInputNumber, {});
  const wrapperSvgComponent34 = shallowMount(SvgComponent34, {});
  
const wrapper35 = shallowMount(IconInput, {});
  const wrapperSvgComponent35 = shallowMount(SvgComponent35, {});
  
const wrapper36 = shallowMount(IconIntro, {});
  const wrapperSvgComponent36 = shallowMount(SvgComponent36, {});
  
const wrapper37 = shallowMount(IconLayout, {});
  const wrapperSvgComponent37 = shallowMount(SvgComponent37, {});
  
const wrapper38 = shallowMount(IconList, {});
  const wrapperSvgComponent38 = shallowMount(SvgComponent38, {});
  
const wrapper39 = shallowMount(IconLocaleProvider, {});
  const wrapperSvgComponent39 = shallowMount(SvgComponent39, {});
  
const wrapper40 = shallowMount(IconModal, {});
  const wrapperSvgComponent40 = shallowMount(SvgComponent40, {});
  
const wrapper41 = shallowMount(IconNavigation, {});
  const wrapperSvgComponent41 = shallowMount(SvgComponent41, {});
  
const wrapper42 = shallowMount(IconNotification, {});
  const wrapperSvgComponent42 = shallowMount(SvgComponent42, {});
  
const wrapper43 = shallowMount(IconOverflow, {});
  const wrapperSvgComponent43 = shallowMount(SvgComponent43, {});
  
const wrapper44 = shallowMount(IconPagination, {});
  const wrapperSvgComponent44 = shallowMount(SvgComponent44, {});
  
const wrapper45 = shallowMount(IconPopconfirm, {});
  const wrapperSvgComponent45 = shallowMount(SvgComponent45, {});
  
const wrapper46 = shallowMount(IconPopover, {});
  const wrapperSvgComponent46 = shallowMount(SvgComponent46, {});
  
const wrapper47 = shallowMount(IconProgress, {});
  const wrapperSvgComponent47 = shallowMount(SvgComponent47, {});
  
const wrapper48 = shallowMount(IconRadio, {});
  const wrapperSvgComponent48 = shallowMount(SvgComponent48, {});
  
const wrapper49 = shallowMount(IconRating, {});
  const wrapperSvgComponent49 = shallowMount(SvgComponent49, {});
  
const wrapper50 = shallowMount(IconScrollList, {});
  const wrapperSvgComponent50 = shallowMount(SvgComponent50, {});
  
const wrapper51 = shallowMount(IconSelect, {});
  const wrapperSvgComponent51 = shallowMount(SvgComponent51, {});
  
const wrapper52 = shallowMount(IconSideSheet, {});
  const wrapperSvgComponent52 = shallowMount(SvgComponent52, {});
  
const wrapper53 = shallowMount(IconSkeleton, {});
  const wrapperSvgComponent53 = shallowMount(SvgComponent53, {});
  
const wrapper54 = shallowMount(IconSlider, {});
  const wrapperSvgComponent54 = shallowMount(SvgComponent54, {});
  
const wrapper55 = shallowMount(IconSpace, {});
  const wrapperSvgComponent55 = shallowMount(SvgComponent55, {});
  
const wrapper56 = shallowMount(IconSpin, {});
  const wrapperSvgComponent56 = shallowMount(SvgComponent56, {});
  
const wrapper57 = shallowMount(IconSteps, {});
  const wrapperSvgComponent57 = shallowMount(SvgComponent57, {});
  
const wrapper58 = shallowMount(IconSwitch, {});
  const wrapperSvgComponent58 = shallowMount(SvgComponent58, {});
  
const wrapper59 = shallowMount(IconTable, {});
  const wrapperSvgComponent59 = shallowMount(SvgComponent59, {});
  
const wrapper60 = shallowMount(IconTabs, {});
  const wrapperSvgComponent60 = shallowMount(SvgComponent60, {});
  
const wrapper61 = shallowMount(IconTagInput, {});
  const wrapperSvgComponent61 = shallowMount(SvgComponent61, {});
  
const wrapper62 = shallowMount(IconTag, {});
  const wrapperSvgComponent62 = shallowMount(SvgComponent62, {});
  
const wrapper63 = shallowMount(IconTimePicker, {});
  const wrapperSvgComponent63 = shallowMount(SvgComponent63, {});
  
const wrapper64 = shallowMount(IconTimeline, {});
  const wrapperSvgComponent64 = shallowMount(SvgComponent64, {});
  
const wrapper65 = shallowMount(IconToast, {});
  const wrapperSvgComponent65 = shallowMount(SvgComponent65, {});
  
const wrapper66 = shallowMount(IconToken, {});
  const wrapperSvgComponent66 = shallowMount(SvgComponent66, {});
  
const wrapper67 = shallowMount(IconTooltip, {});
  const wrapperSvgComponent67 = shallowMount(SvgComponent67, {});
  
const wrapper68 = shallowMount(IconTransfer, {});
  const wrapperSvgComponent68 = shallowMount(SvgComponent68, {});
  
const wrapper69 = shallowMount(IconTreeSelect, {});
  const wrapperSvgComponent69 = shallowMount(SvgComponent69, {});
  
const wrapper70 = shallowMount(IconTree, {});
  const wrapperSvgComponent70 = shallowMount(SvgComponent70, {});
  
const wrapper71 = shallowMount(IconTypography, {});
  const wrapperSvgComponent71 = shallowMount(SvgComponent71, {});
  
const wrapper72 = shallowMount(IconUpload, {});
  const wrapperSvgComponent72 = shallowMount(SvgComponent72, {});
  
const wrapper73 = shallowMount(IconVersionTwo, {});
  const wrapperSvgComponent73 = shallowMount(SvgComponent73, {});
  
const wrapper74 = shallowMount(IconWheelChair, {});
  const wrapperSvgComponent74 = shallowMount(SvgComponent74, {});
  
})
  